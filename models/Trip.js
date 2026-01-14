import mongoose from 'mongoose';

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
export default Trip;
