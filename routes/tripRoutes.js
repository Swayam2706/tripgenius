import express from 'express';
import Trip from '../models/Trip.js';

const router = express.Router();

// Create a new trip
router.post('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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
router.get('/user/:userId', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

export default router;
