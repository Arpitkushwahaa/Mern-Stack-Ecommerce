// Simple script with explicit console logs
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function verifyProducts() {
  console.log('Starting product verification...');
  
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to MongoDB');
    
    // Count total products
    const totalCount = await Product.countDocuments();
    console.log(`Total products in database: ${totalCount}`);
    
    // Count products by brand
    const brands = ['Nike', 'Adidas', 'Puma', 'Levi\'s', 'Zara', 'H&M'];
    console.log('\nProducts by brand:');
    
    for (const brand of brands) {
      const count = await Product.countDocuments({ brand });
      console.log(`${brand}: ${count} products`);
    }
    
    // Count products by category
    const categories = ['men', 'women', 'kids', 'accessories', 'footwear'];
    console.log('\nProducts by category:');
    
    for (const category of categories) {
      const count = await Product.countDocuments({ category });
      console.log(`${category}: ${count} products`);
    }
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
    console.log('Verification complete!');
    
  } catch (error) {
    console.error('Error during verification:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

// Execute the function
console.log('Script started');
verifyProducts().then(() => {
  console.log('Script finished');
}).catch(err => {
  console.error('Script failed:', err);
});
