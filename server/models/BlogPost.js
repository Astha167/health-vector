const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    category: {
      type: String,
      enum: ['Physical', 'Mental', 'Emotional', 'Holistic'],
      required: true,
    },
    author: { type: String, default: 'VitaMetrics Team' },
    coverImage: { type: String },
    readTime: { type: Number, default: 5 }, // minutes
    published: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('BlogPost', blogPostSchema);
