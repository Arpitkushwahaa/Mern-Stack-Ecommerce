const mongoose = require('mongoose');
const Feature = require('./models/Feature');

// Direct MongoDB connection string - typically you would use an environment variable
const MONGODB_URI = 'mongodb://localhost:27017/mern-ecommerce';

// Curated banner images with proper aspect ratios and visibility
const curatedBanners = [
  {
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Fashion Model in Black - Perfect Landscape Ratio'
  },
  {
    image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Fashion Brand Campaign - Proper Visibility'
  },
  {
    image: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Fashion Week Runway - Landscape Optimized'
  },
  {
    image: 'https://images.pexels.com/photos/6567741/pexels-photo-6567741.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Celebrity Style Showcase - Proper Ratio'
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
    description: 'Shopping Fashion Model - Optimized'
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    description: 'Fashion Model Banner - Properly Adjusted'
  }
];

async function addCuratedBanners() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing feature images
    await Feature.deleteMany({});
    console.log('Cleared existing banner images');
    
    // Add new curated banner images
    const banners = [];
    for (const banner of curatedBanners) {
      const newBanner = new Feature({
        image: banner.image
      });
      await newBanner.save();
      banners.push(newBanner);
      console.log(`Added curated banner: ${banner.description}`);
    }
    
    console.log(`\nAdded ${banners.length} properly adjusted banner images to the slider`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    return banners;
  } catch (error) {
    console.error('Error adding curated banner images:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    throw error;
  }
}

// Run the function
addCuratedBanners()
  .then(() => {
    console.log('Curated banner images added successfully!');
  })
  .catch(err => {
    console.error('Failed to add curated banner images:', err);
    process.exit(1);
  });
