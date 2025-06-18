require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function checkBrandProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Get counts by brand
    const brands = ['Nike', 'Adidas', 'Puma', 'Levi\'s', 'Zara', 'H&M'];
    
    console.log('Products by brand:');
    for (const brand of brands) {
      const count = await Product.countDocuments({ brand });
      console.log(`- ${brand}: ${count} products`);
      
      // Get sample products for this brand
      if (count > 0) {
        const samples = await Product.find({ brand }).limit(3);
        samples.forEach(product => {
          console.log(`  • ${product.title} (${product.category})`);
        });
      }
    }
    
    // Get total count
    const totalCount = await Product.countDocuments();
    console.log(`\nTotal products in database: ${totalCount}`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error checking brand products:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

// Run the function
checkBrandProducts();
