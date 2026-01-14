import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Sync User (Login/Signup)
router.post('/sync', async (req, res) => {
    try {
        const { email, googleId, name, picture } = req.body;

        console.log('👤 Syncing user:', { email, name });

        if (!email || !googleId) {
            return res.status(400).json({ error: 'Missing required user fields' });
        }

        const user = await User.findOneAndUpdate(
            { email }, // Find by email
            {
                email,
                googleId,
                name,
                picture,
                lastLogin: new Date()
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log('✅ User synced successfully:', user._id);
        res.status(200).json(user);
    } catch (error) {
        console.error('❌ Error syncing user:', error);
        res.status(500).json({ error: 'Failed to sync user' });
    }
});

export default router;
