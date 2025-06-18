require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Sample product data - just a few simple products
const sampleProducts = [
  {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
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
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
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
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    title: 'Running Shoes',
    description: 'Comfortable and durable running shoes',
    category: 'Fashion',
    brand: 'SportyStep',
    price: 89.99,
    salePrice: 69.99,
    totalStock: 100,
    averageReview: 4.7
  }
];

async function addSampleProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Add products
    const result = await Product.insertMany(sampleProducts);
    console.log(`Added ${result.length} sample products to database`);
    
    // Disconnect
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    return result;
  } catch (error) {
    console.error('Error adding sample products:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    throw error;
  }
}

// Run the function
addSampleProducts()
  .then(products => {
    console.log('Sample products added successfully:');
    products.forEach(p => console.log(` - ${p.title} (${p.category})`));
  })
  .catch(err => {
    console.error('Failed to add sample products:', err);
    process.exit(1);
  });
