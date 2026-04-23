const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assessmentType: {
      type: String,
      enum: ['Individual', 'Corporate', 'Online Consultation'],
      required: true,
    },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    notes: { type: String },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    bookedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
