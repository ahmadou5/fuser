import mongoose from "mongoose";

const ProfileEntrySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  pin: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    required: false,
    trim: true,
  },
  profilePicture: {
    type: String,
    required: false,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const ProfileEntry =
  mongoose.models.ProfileEntry ||
  mongoose.model("ProfileEntry", ProfileEntrySchema);
