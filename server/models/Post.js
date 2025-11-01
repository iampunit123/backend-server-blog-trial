const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  coverImage: { type: String, required: true },
  category: { type: String, required: true },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  tags: [String],
  readTime: { type: Number, default: 5 },
  likes: { type: Number, default: 0 },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);