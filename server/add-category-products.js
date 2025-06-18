require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Sample products for different categories
const categoryProducts = [
  // Men's Products
  {
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7',
    title: 'Men\'s Casual Shirt',
    description: 'Comfortable cotton casual shirt for everyday wear',
    category: 'men',
    brand: 'H&M',
    price: 49.99,
    salePrice: 39.99,
    totalStock: 75,
    averageReview: 4.3
  },
  {
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22',
    title: 'Men\'s Slim Fit Jeans',
    description: 'Classic slim fit jeans with stretch comfort',
    category: 'men',
    brand: 'Levi\'s',
    price: 79.99,
    salePrice: 59.99,
    totalStock: 60,
    averageReview: 4.5
  },
  {
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
    title: 'Men\'s Formal Blazer',
    description: 'Elegant formal blazer for professional settings',
    category: 'men',
    brand: 'Zara',
    price: 129.99,
    salePrice: 99.99,
    totalStock: 40,
    averageReview: 4.7
  },
  
  // Women's Products
  {
    image: 'https://images.unsplash.com/photo-1551163943-3f7253a3b1cb',
    title: 'Women\'s Summer Dress',
    description: 'Light and flowy summer dress with floral pattern',
    category: 'women',
    brand: 'Zara',
    price: 59.99,
    salePrice: 49.99,
    totalStock: 65,
    averageReview: 4.6
  },
  {
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3',
    title: 'Women\'s Denim Jacket',
    description: 'Classic denim jacket for all seasons',
    category: 'women',
    brand: 'H&M',
    price: 89.99,
    salePrice: 69.99,
    totalStock: 50,
    averageReview: 4.4
  },
  {
    image: 'https://images.unsplash.com/photo-1551048632-24e444b48a3e',
    title: 'Women\'s Leather Handbag',
    description: 'Premium leather handbag with multiple compartments',
    category: 'women',
    brand: 'Puma',
    price: 149.99,
    salePrice: 129.99,
    totalStock: 35,
    averageReview: 4.8
  },
  
  // Kids' Products
  {
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea',
    title: 'Kids\' Colorful T-Shirt',
    description: 'Bright and colorful t-shirt for children',
    category: 'kids',
    brand: 'Nike',
    price: 24.99,
    salePrice: 19.99,
    totalStock: 90,
    averageReview: 4.5
  },
  {
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8',
    title: 'Kids\' Denim Overalls',
    description: 'Comfortable denim overalls for active kids',
    category: 'kids',
    brand: 'Adidas',
    price: 39.99,
    salePrice: 29.99,
    totalStock: 70,
    averageReview: 4.3
  },
  {
    image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4',
    title: 'Kids\' Winter Jacket',
    description: 'Warm winter jacket with hood for children',
    category: 'kids',
    brand: 'H&M',
    price: 59.99,
    salePrice: 49.99,
    totalStock: 55,
    averageReview: 4.6
  },
  
  // Accessories
  {
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1',
    title: 'Classic Wristwatch',
    description: 'Elegant wristwatch with leather strap',
    category: 'accessories',
    brand: 'Zara',
    price: 129.99,
    salePrice: 99.99,
    totalStock: 40,
    averageReview: 4.7
  },
  {
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3',
    title: 'Designer Sunglasses',
    description: 'UV-protected designer sunglasses',
    category: 'accessories',
    brand: 'Nike',
    price: 89.99,
    salePrice: 69.99,
    totalStock: 45,
    averageReview: 4.5
  },
  {
    image: 'https://images.unsplash.com/photo-1611923134239-2cbe9b54b9e2',
    title: 'Leather Wallet',
    description: 'Genuine leather wallet with multiple card slots',
    category: 'accessories',
    brand: 'Levi\'s',
    price: 49.99,
    salePrice: 39.99,
    totalStock: 60,
    averageReview: 4.4
  },
  
  // Footwear
  {
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
    title: 'Men\'s Running Shoes',
    description: 'Lightweight running shoes with cushioned sole',
    category: 'footwear',
    brand: 'Nike',
    price: 119.99,
    salePrice: 99.99,
    totalStock: 50,
    averageReview: 4.8
  },
  {
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86',
    title: 'Women\'s Casual Sneakers',
    description: 'Comfortable casual sneakers for everyday wear',
    category: 'footwear',
    brand: 'Adidas',
    price: 89.99,
    salePrice: 69.99,
    totalStock: 55,
    averageReview: 4.6
  },
  {
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
    title: 'Kids\' Sport Shoes',
    description: 'Durable sport shoes for active children',
    category: 'footwear',
    brand: 'Puma',
    price: 59.99,
    salePrice: 49.99,
    totalStock: 65,
    averageReview: 4.5
  }
];

async function addCategoryProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Add products for each category
    const result = await Product.insertMany(categoryProducts);
    console.log(`Added ${result.length} category-specific products to database`);
    
    // Group and count products by category
    const categoryCounts = {};
    result.forEach(product => {
      if (!categoryCounts[product.category]) {
        categoryCounts[product.category] = 0;
      }
      categoryCounts[product.category]++;
    });
    
    // Display counts by category
    console.log('\nProducts added by category:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`- ${category}: ${count} products`);
    });
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
    
    return result;
  } catch (error) {
    console.error('Error adding category products:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    throw error;
  }
}

// Run the function
addCategoryProducts()
  .then(() => {
    console.log('Category products added successfully!');
  })
  .catch(err => {
    console.error('Failed to add category products:', err);
    process.exit(1);
  });
