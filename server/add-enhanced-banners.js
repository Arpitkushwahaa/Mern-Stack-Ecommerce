require('dotenv').config();
const mongoose = require('mongoose');
const Feature = require('./models/Feature');

// Enhanced e-commerce banner images with more meaningful content
const enhancedBanners = [
  {
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop',
    description: 'Premium Footwear Collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop',
    description: 'Sneakers Collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2070&auto=format&fit=crop',
    description: 'Sportswear Collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop',
    description: 'Fashion Accessories'
  },
  {
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop',
    description: 'Summer Fashion Sale'
  },
  {
    image: 'https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=2069&auto=format&fit=crop',
    description: 'Exclusive Brand Collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=2070&auto=format&fit=crop',
    description: 'Kids Collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?q=80&w=2031&auto=format&fit=crop',
    description: 'Luxury Watch Collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=2070&auto=format&fit=crop',
    description: 'Men\'s Fashion Sale'
  },
  {
    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=2071&auto=format&fit=crop',
    description: 'Women\'s Fashion Collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop',
    description: 'Premium Denim Collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop',
    description: 'T-shirt Collection'
  }
];

async function addEnhancedBanners() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing feature images
    await Feature.deleteMany({});
    console.log('Cleared existing banner images');
    
    // Add new enhanced banner images
    const banners = [];
    for (const banner of enhancedBanners) {
      const newBanner = new Feature({
        image: banner.image
      });
      await newBanner.save();
      banners.push(newBanner);
      console.log(`Added banner: ${banner.description}`);
    }
    
    console.log(`\nAdded ${banners.length} enhanced banner images to the slider`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    return banners;
  } catch (error) {
    console.error('Error adding enhanced banner images:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    throw error;
  }
}

// Run the function
addEnhancedBanners()
  .then(() => {
    console.log('Enhanced banner images added successfully!');
  })
  .catch(err => {
    console.error('Failed to add enhanced banner images:', err);
    process.exit(1);
  });
