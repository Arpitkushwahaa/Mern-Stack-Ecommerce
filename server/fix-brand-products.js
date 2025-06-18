require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// The brand IDs in the filter configuration are:
// nike, adidas, puma, levi, zara, h&m
// But some of our products have brand names like "Levi's" instead of "levi"
// Let's fix this by adding products with the exact brand IDs

const brandProducts = [
  // Nike Products
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    title: 'Nike Air Max Sneakers',
    description: 'Iconic Nike Air Max sneakers with maximum comfort and style',
    category: 'footwear',
    brand: 'nike', // Exact match with filter ID
    price: 149.99,
    salePrice: 129.99,
    totalStock: 50,
    averageReview: 4.8
  },
  {
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
    title: 'Nike Dri-FIT Performance Shirt',
    description: 'Moisture-wicking performance t-shirt for sports and training',
    category: 'men',
    brand: 'nike', // Exact match with filter ID
    price: 34.99,
    salePrice: 29.99,
    totalStock: 80,
    averageReview: 4.6
  },
  {
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111',
    title: 'Nike Revolution Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning',
    category: 'footwear',
    brand: 'nike', // Exact match with filter ID
    price: 89.99,
    salePrice: 79.99,
    totalStock: 65,
    averageReview: 4.7
  },
  
  // Adidas Products
  {
    image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f',
    title: 'Adidas Ultraboost Running Shoes',
    description: 'Responsive running shoes with Boost technology for maximum comfort',
    category: 'footwear',
    brand: 'adidas', // Exact match with filter ID
    price: 179.99,
    salePrice: 159.99,
    totalStock: 45,
    averageReview: 4.9
  },
  {
    image: 'https://images.unsplash.com/photo-1584539696499-bff0b4768e4e',
    title: 'Adidas Originals Hoodie',
    description: 'Classic Adidas hoodie with trefoil logo for casual style',
    category: 'men',
    brand: 'adidas', // Exact match with filter ID
    price: 69.99,
    salePrice: 59.99,
    totalStock: 55,
    averageReview: 4.7
  },
  {
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c',
    title: 'Adidas Track Pants',
    description: 'Comfortable track pants with iconic three stripes design',
    category: 'women',
    brand: 'adidas', // Exact match with filter ID
    price: 59.99,
    salePrice: 49.99,
    totalStock: 60,
    averageReview: 4.6
  },
  
  // Puma Products
  {
    image: 'https://images.unsplash.com/photo-1608379743498-63e07f345a6b',
    title: 'Puma RS-X Sneakers',
    description: 'Bold and chunky retro-inspired sneakers for street style',
    category: 'footwear',
    brand: 'puma', // Exact match with filter ID
    price: 119.99,
    salePrice: 99.99,
    totalStock: 40,
    averageReview: 4.5
  },
  {
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    title: 'Puma Essential Logo Tee',
    description: 'Classic cotton t-shirt with Puma cat logo for everyday wear',
    category: 'men',
    brand: 'puma', // Exact match with filter ID
    price: 29.99,
    salePrice: 24.99,
    totalStock: 75,
    averageReview: 4.4
  },
  {
    image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5',
    title: 'Puma Training Jacket',
    description: 'Lightweight training jacket for sports and casual wear',
    category: 'women',
    brand: 'puma', // Exact match with filter ID
    price: 79.99,
    salePrice: 69.99,
    totalStock: 50,
    averageReview: 4.6
  },
  
  // Levi Products (note: filter ID is "levi" not "Levi's")
  {
    image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb',
    title: 'Levi 501 Original Jeans',
    description: 'Iconic straight fit jeans with button fly and timeless style',
    category: 'men',
    brand: 'levi', // Exact match with filter ID
    price: 89.99,
    salePrice: 79.99,
    totalStock: 60,
    averageReview: 4.8
  },
  {
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f',
    title: 'Levi Denim Jacket',
    description: 'Classic trucker jacket in premium denim for versatile styling',
    category: 'women',
    brand: 'levi', // Exact match with filter ID
    price: 99.99,
    salePrice: 89.99,
    totalStock: 45,
    averageReview: 4.7
  },
  {
    image: 'https://images.unsplash.com/photo-1604176424472-9d7122c67a59',
    title: 'Levi Slim Fit Chinos',
    description: 'Versatile slim fit chinos for casual or smart casual wear',
    category: 'men',
    brand: 'levi', // Exact match with filter ID
    price: 69.99,
    salePrice: 59.99,
    totalStock: 55,
    averageReview: 4.5
  },
  
  // Zara Products
  {
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
    title: 'Zara Tailored Blazer',
    description: 'Elegant tailored blazer for formal occasions and office wear',
    category: 'women',
    brand: 'zara', // Exact match with filter ID
    price: 129.99,
    salePrice: 109.99,
    totalStock: 40,
    averageReview: 4.6
  },
  {
    image: 'https://images.unsplash.com/photo-1589810635657-232948472d98',
    title: 'Zara Pleated Skirt',
    description: 'Stylish pleated midi skirt for versatile styling options',
    category: 'women',
    brand: 'zara', // Exact match with filter ID
    price: 59.99,
    salePrice: 49.99,
    totalStock: 50,
    averageReview: 4.5
  },
  {
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc',
    title: 'Zara Slim Fit Shirt',
    description: 'Modern slim fit shirt with subtle pattern for smart casual looks',
    category: 'men',
    brand: 'zara', // Exact match with filter ID
    price: 49.99,
    salePrice: 39.99,
    totalStock: 65,
    averageReview: 4.4
  },
  
  // H&M Products (note: filter ID is "h&m")
  {
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68',
    title: 'H&M Cotton T-Shirt Pack',
    description: 'Pack of 3 essential cotton t-shirts for everyday wear',
    category: 'men',
    brand: 'h&m', // Exact match with filter ID
    price: 29.99,
    salePrice: 24.99,
    totalStock: 80,
    averageReview: 4.3
  },
  {
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f',
    title: 'H&M Knit Sweater',
    description: 'Soft knit sweater for colder seasons with comfortable fit',
    category: 'women',
    brand: 'h&m', // Exact match with filter ID
    price: 39.99,
    salePrice: 34.99,
    totalStock: 60,
    averageReview: 4.4
  },
  {
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
    title: 'H&M Kids Pajama Set',
    description: 'Comfortable cotton pajama set for children with fun prints',
    category: 'kids',
    brand: 'h&m', // Exact match with filter ID
    price: 24.99,
    salePrice: 19.99,
    totalStock: 70,
    averageReview: 4.6
  }
];

async function fixBrandProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Add products with correct brand IDs
    const result = await Product.insertMany(brandProducts);
    console.log(`Added ${result.length} products with correct brand IDs`);
    
    // Group and count products by brand
    const brandCounts = {};
    result.forEach(product => {
      if (!brandCounts[product.brand]) {
        brandCounts[product.brand] = 0;
      }
      brandCounts[product.brand]++;
    });
    
    // Display counts by brand
    console.log('\nProducts added by brand:');
    Object.entries(brandCounts).forEach(([brand, count]) => {
      console.log(`- ${brand}: ${count} products`);
    });
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
    
    return result;
  } catch (error) {
    console.error('Error fixing brand products:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    throw error;
  }
}

// Run the function
fixBrandProducts()
  .then(() => {
    console.log('Brand products fixed successfully!');
  })
  .catch(err => {
    console.error('Failed to fix brand products:', err);
    process.exit(1);
  });
