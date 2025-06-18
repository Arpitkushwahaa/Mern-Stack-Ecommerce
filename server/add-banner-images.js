require('dotenv').config();
const mongoose = require('mongoose');
const Feature = require('./models/Feature');

// High-quality e-commerce banner images
const bannerImages = [
  {
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop',
    description: 'Summer Collection Banner'
  },
  {
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2070&auto=format&fit=crop',
    description: 'New Arrivals Banner'
  },
  {
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop',
    description: 'Sale Banner'
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
    description: 'Fashion Collection Banner'
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
    description: 'Seasonal Offers Banner'
  },
  {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
    description: 'Shop Now Banner'
  }
];

async function addBannerImages() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing feature images
    await Feature.deleteMany({});
    console.log('Cleared existing banner images');
    
    // Add new banner images
    const banners = [];
    for (const banner of bannerImages) {
      const newBanner = new Feature({
        image: banner.image
      });
      await newBanner.save();
      banners.push(newBanner);
      console.log(`Added banner: ${banner.description}`);
    }
    
    console.log(`\nAdded ${banners.length} banner images to the slider`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    return banners;
  } catch (error) {
    console.error('Error adding banner images:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    throw error;
  }
}

// Run the function
addBannerImages()
  .then(() => {
    console.log('Banner images added successfully!');
  })
  .catch(err => {
    console.error('Failed to add banner images:', err);
    process.exit(1);
  });
