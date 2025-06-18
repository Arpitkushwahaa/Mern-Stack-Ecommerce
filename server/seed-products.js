require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Sample product data
const sampleProducts = [
  {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    brand: 'SoundMaster',
    price: 199.99,
    salePrice: 149.99,
    totalStock: 50,
    averageReview: 4.5
  },
  {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Smart Watch',
    description: 'Feature-rich smartwatch with health monitoring',
    category: 'Electronics',
    brand: 'TechGear',
    price: 299.99,
    salePrice: 249.99,
    totalStock: 30,
    averageReview: 4.2
  },
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Running Shoes',
    description: 'Comfortable and durable running shoes',
    category: 'Fashion',
    brand: 'SportyStep',
    price: 89.99,
    salePrice: 69.99,
    totalStock: 100,
    averageReview: 4.7
  },
  {
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Casual Sneakers',
    description: 'Stylish casual sneakers for everyday wear',
    category: 'Fashion',
    brand: 'UrbanWalk',
    price: 79.99,
    salePrice: 59.99,
    totalStock: 80,
    averageReview: 4.3
  },
  {
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Skin Care Set',
    description: 'Complete skin care routine set with natural ingredients',
    category: 'Beauty',
    brand: 'NaturGlow',
    price: 49.99,
    salePrice: 39.99,
    totalStock: 60,
    averageReview: 4.8
  },
  {
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Smart Speaker',
    description: 'Voice-controlled smart speaker with premium sound',
    category: 'Electronics',
    brand: 'EchoTech',
    price: 129.99,
    salePrice: 99.99,
    totalStock: 40,
    averageReview: 4.4
  },
  {
    image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Premium Sunglasses',
    description: 'UV-protected stylish sunglasses',
    category: 'Fashion',
    brand: 'SunStyle',
    price: 159.99,
    salePrice: 129.99,
    totalStock: 25,
    averageReview: 4.6
  },
  {
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Designer Sunglasses',
    description: 'Luxury designer sunglasses with case',
    category: 'Fashion',
    brand: 'LuxView',
    price: 199.99,
    salePrice: 179.99,
    totalStock: 15,
    averageReview: 4.9
  }
];

console.log('Starting database seeding process...');
console.log('Using MongoDB URI:', process.env.MONGODB_URI);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected successfully');
    
    try {
      // Clear existing products
      await Product.deleteMany({});
      console.log('Existing products removed');
      
      // Insert sample products
      const createdProducts = await Product.insertMany(sampleProducts);
      console.log(`${createdProducts.length} sample products added to database`);
      
      // Disconnect from MongoDB
      mongoose.disconnect();
      console.log('MongoDB disconnected');
    } catch (error) {
      console.error('Error seeding database:', error);
      mongoose.disconnect();
    }
  })
  .catch((error) => console.log('MongoDB connection error:', error));
