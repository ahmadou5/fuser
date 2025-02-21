import mongoose from 'mongoose';

const WaitlistEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const WaitlistEntry =
  mongoose.models.WaitlistEntry ||
  mongoose.model('WaitlistEntry', WaitlistEntrySchema);
