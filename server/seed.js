const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Post = require('./models/Post');
require('dotenv').config();

const samplePosts = [
  {
    title: "Getting Started with React",
    content: "React is a powerful JavaScript library for building user interfaces. In this post, we'll explore the basics of React components, state, and props...",
    excerpt: "Learn the fundamentals of React and how to build your first component",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Technology",
    tags: ["react", "javascript", "frontend"],
    readTime: 5,
    featured: true
  },
  {
    title: "The Art of Travel Photography",
    content: "Travel photography is more than just taking pictures of landmarks. It's about capturing the essence of a place, its people, and its culture...",
    excerpt: "Discover tips and techniques for capturing stunning travel photos",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Travel",
    tags: ["photography", "travel", "tips"],
    readTime: 7,
    featured: true
  },
  {
    title: "Healthy Eating Made Simple",
    content: "Eating healthy doesn't have to be complicated. With a few simple principles, you can transform your diet and feel better than ever...",
    excerpt: "Simple strategies for maintaining a healthy diet in a busy world",
    coverImage: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Health",
    tags: ["health", "nutrition", "wellness"],
    readTime: 6,
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/greatblog');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create a test user
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    await user.save();
    console.log('✅ Created test user');

    // Create sample posts
    const postsWithAuthor = samplePosts.map(post => ({
      ...post,
      author: user._id
    }));

    await Post.insertMany(postsWithAuthor);
    console.log('✅ Created sample posts');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();