require('dotenv').config();
const mongoose = require('mongoose');
const Feature = require('./models/Feature');

// Celebrity fashion campaign images for e-commerce banners
// Using fashion campaign and editorial images that work well in banner format
const celebrityFashionBanners = [
  // These URLs point to fashion campaign and editorial images that are suitable for e-commerce banners
  // They have the correct aspect ratio and feature celebrity fashion content
  {
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Celebrity Fashion Editorial'
  },
  {
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Hollywood Style Fashion'
  },
  {
    image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Celebrity Brand Campaign'
  },
  {
    image: 'https://images.pexels.com/photos/247204/pexels-photo-247204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Fashion Week Celebrity'
  },
  {
    image: 'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Luxury Fashion Campaign'
  },
  {
    image: 'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Celebrity Couture Fashion'
  },
  {
    image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Fashion Icon Campaign'
  },
  {
    image: 'https://images.pexels.com/photos/1485781/pexels-photo-1485781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Celebrity Style Collection'
  }
];

async function addCelebrityFashionBanners() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Get existing banners to keep them
    const existingBanners = await Feature.find({});
    console.log(`Found ${existingBanners.length} existing banner images to preserve`);
    
    // Delete all existing banners
    await Feature.deleteMany({});
    console.log('Temporarily cleared existing banner images');
    
    // First add the new celebrity fashion banners
    const newBanners = [];
    for (const banner of celebrityFashionBanners) {
      const newBanner = new Feature({
        image: banner.image
      });
      await newBanner.save();
      newBanners.push(newBanner);
      console.log(`Added celebrity fashion banner: ${banner.description}`);
    }
    
    // Then re-add the existing banners
    for (const banner of existingBanners) {
      const restoredBanner = new Feature({
        image: banner.image
      });
      await restoredBanner.save();
    }
    
    const totalBanners = await Feature.countDocuments();
    console.log(`\nAdded ${newBanners.length} celebrity fashion banners to the slider`);
    console.log(`Total banners now: ${totalBanners}`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    return newBanners;
  } catch (error) {
    console.error('Error adding celebrity fashion banners:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    throw error;
  }
}

// Run the function
addCelebrityFashionBanners()
  .then(() => {
    console.log('Celebrity fashion banners added successfully!');
  })
  .catch(err => {
    console.error('Failed to add celebrity fashion banners:', err);
    process.exit(1);
  });
