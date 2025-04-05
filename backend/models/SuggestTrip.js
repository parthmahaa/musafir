import mongoose from 'mongoose';

const SuggestTripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  destinations: [
    {
      name: { type: String, required: true },
      location: { type: String },
      activities: [
        {
          name: { type: String, required: true },
          date: { type: Date },
          time: { type: String },
          notes: { type: String },
        },
      ],
      notes: { type: String },
    },
  ],
  budget: { type: Number, required: true },
  suggestedBy: { type: String, default: 'System' },
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('SuggestTrip', SuggestTripSchema);
