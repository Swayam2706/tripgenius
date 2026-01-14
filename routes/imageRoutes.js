import express from 'express';
import axios from 'axios';

const router = express.Router();

// Google Image Search endpoint
router.get('/search', async (req, res) => {
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

export default router;
