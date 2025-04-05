import mongoose from "mongoose";

const DestinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  activities: [{ 
    name: { type: String },
    date: { type: Date },
    time: { type: String },
    notes: { type: String }
  }],
  notes: { type: String }
});

const TripSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  destinations: [DestinationSchema],
  budget: { type: Number, required: true },
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the 'updatedAt' field on save
TripSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Trip', TripSchema);