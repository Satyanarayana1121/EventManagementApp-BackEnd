// models/Event.js
import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: String,
  time: String,
  location: String,
  attendees: [String],  // Store attendee names as an array of strings
});

export default model('Event', eventSchema);
