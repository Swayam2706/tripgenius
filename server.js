import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`🌐 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/tripgenius';

mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Trip Schema
const tripSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  duration: { type: Number, required: true },
  budget: { type: String, required: true },
  travelers: { type: String, required: true },
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  aiResponse: { type: mongoose.Schema.Types.Mixed, required: true }, // Store JSON response
  formData: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Trip = mongoose.model('Trip', tripSchema);

// Routes

// Create a new trip
app.post('/api/trips', async (req, res) => {
  try {
    console.log('📥 Received trip creation request:', req.body);
    const { destination, duration, budget, travelers, userId, userEmail, aiResponse, formData } = req.body;
    
    // Validate required fields
    if (!destination || !duration || !budget || !travelers || !userId || !userEmail || !aiResponse) {
      console.error('❌ Missing required fields:', { destination, duration, budget, travelers, userId, userEmail, aiResponse });
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const trip = new Trip({
      destination,
      duration,
      budget,
      travelers,
      userId,
      userEmail,
      aiResponse,
      formData,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('💾 Saving trip to database...');
    const savedTrip = await trip.save();
    console.log('✅ Trip saved successfully:', savedTrip._id);
    res.status(201).json(savedTrip);
  } catch (error) {
    console.error('❌ Error creating trip:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({ error: 'Failed to create trip', details: error.message });
  }
});

// Get trip by ID
app.get('/api/trips/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
});

// Get all trips for a user
app.get('/api/trips/user/:userId', async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    console.error('Error fetching user trips:', error);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

// Update trip
app.put('/api/trips/:id', async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ error: 'Failed to update trip' });
  }
});

// Delete trip
app.delete('/api/trips/:id', async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ error: 'Failed to delete trip' });
  }
});

// Google Image Search endpoint
app.get('/api/images/search', async (req, res) => {
  try {
    const { query, type = 'place' } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const GOOGLE_CUSTOM_SEARCH_API_KEY = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY;
    const GOOGLE_CUSTOM_SEARCH_ENGINE_ID = process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID;

    // If Google Custom Search is not configured, return a fallback image
    if (!GOOGLE_CUSTOM_SEARCH_API_KEY || !GOOGLE_CUSTOM_SEARCH_ENGINE_ID) {
      console.warn('Google Custom Search API not configured, using fallback image');
      console.warn('API Key exists:', !!GOOGLE_CUSTOM_SEARCH_API_KEY);
      console.warn('Engine ID exists:', !!GOOGLE_CUSTOM_SEARCH_ENGINE_ID);
      return res.json({ 
        imageUrl: getFallbackImageUrl(type),
        source: 'fallback'
      });
    }

    // Build search query based on type
    let searchQuery = query;
    if (type === 'hotel') {
      searchQuery = `${query} hotel ${query.includes('hotel') ? '' : 'accommodation'}`;
    } else if (type === 'place') {
      searchQuery = `${query} tourist attraction landmark`;
    } else if (type === 'destination') {
      searchQuery = `${query} travel destination`;
    }

    console.log(`Making Google API call for query: "${searchQuery}"`);
    console.log('API Key (first 10 chars):', GOOGLE_CUSTOM_SEARCH_API_KEY?.substring(0, 10) + '...');
    console.log('Engine ID:', GOOGLE_CUSTOM_SEARCH_ENGINE_ID);

    // Call Google Custom Search API
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: GOOGLE_CUSTOM_SEARCH_API_KEY,
        cx: GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
        q: searchQuery,
        searchType: 'image',
        num: 1,
        safe: 'active',
        imgSize: 'large',
        imgType: 'photo'
      }
    });

    console.log('Google API response status:', response.status);
    console.log('Google API response data keys:', Object.keys(response.data));
    console.log('Items found:', response.data.items?.length || 0);

    if (response.data.items && response.data.items.length > 0) {
      const imageUrl = response.data.items[0].link;
      console.log('✓ Found Google image:', imageUrl);
      return res.json({ 
        imageUrl,
        source: 'google'
      });
    } else {
      // No images found, return fallback
      console.warn('No images found in Google API response, using fallback');
      return res.json({ 
        imageUrl: getFallbackImageUrl(type),
        source: 'fallback'
      });
    }
  } catch (error) {
    console.error('Error fetching Google image:', error.message);
    console.error('Full error:', error.response?.data || error);
    // Return fallback image on error
    return res.json({ 
      imageUrl: getFallbackImageUrl(req.query.type || 'place'),
      source: 'fallback'
    });
  }
});

// Helper function for fallback images
function getFallbackImageUrl(type = 'place') {
  const images = {
    place: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    destination: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop'
  };
  return images[type] || images.place;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



