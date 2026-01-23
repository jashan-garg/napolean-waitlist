import mongoose from 'mongoose';

const WaitlistSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Waitlist ||
    mongoose.model('Waitlist', WaitlistSchema);
