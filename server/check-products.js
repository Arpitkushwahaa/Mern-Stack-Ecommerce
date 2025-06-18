require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function checkProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Check existing products
    const products = await Product.find({});
    console.log(`Found ${products.length} products in the database`);
    
    if (products.length === 0) {
      console.log('No products found. Adding sample products...');
      
      // Sample product data
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
      
      // Add sample products
      const result = await Product.insertMany(sampleProducts);
      console.log(`Added ${result.length} sample products to database`);
      
      // List the added products
      result.forEach(p => console.log(` - ${p.title} (${p.category})`));
    } else {
      console.log('Products found in database:');
      products.slice(0, 5).forEach(p => console.log(` - ${p.title} (${p.category})`));
      if (products.length > 5) {
        console.log(`... and ${products.length - 5} more`);
      }
    }
    
    // Disconnect
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

// Run the function
checkProducts();
