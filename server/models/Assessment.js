const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    responses: [
      {
        questionId: { type: Number, required: true },
        answer: { type: Number, min: 1, max: 5, required: true },
      },
    ],
    scores: {
      physical: { type: Number, min: 0, max: 100 },
      mental: { type: Number, min: 0, max: 100 },
      emotional: { type: Number, min: 0, max: 100 },
      overall: { type: Number, min: 0, max: 100 },
    },
    prakritiScore: {
      vata: { type: Number, default: 0 },
      pitta: { type: Number, default: 0 },
      kapha: { type: Number, default: 0 },
    },
    prakritiType: { type: String, enum: ['Vata', 'Pitta', 'Kapha', null], default: null },
    dimensionBreakdown: {
      // Physical sub-dimensions
      sleep: Number,
      energy: Number,
      activity: Number,
      diet: Number,
      hydration: Number,
      // Mental sub-dimensions
      stress: Number,
      focus: Number,
      workLife: Number,
      anxiety: Number,
      digitalUse: Number,
      // Emotional sub-dimensions
      mood: Number,
      purpose: Number,
      relationships: Number,
      regulation: Number,
      gratitude: Number,
    },
    completedAt: { type: Date, default: Date.now },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assessment', assessmentSchema);
