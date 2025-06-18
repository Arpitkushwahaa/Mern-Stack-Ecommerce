require('dotenv').config();
const mongoose = require('mongoose');
const Feature = require('./models/Feature');

// Landscape-oriented celebrity and fashion banner images
const landscapeBanners = [
  {
    image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Fashion Brand Campaign - Landscape'
  },
  {
    image: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Fashion Week Runway - Landscape'
  },
  {
    image: 'https://images.pexels.com/photos/5325588/pexels-photo-5325588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Celebrity Fashion Collection - Landscape'
  },
  {
    image: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Fashion Models Showcase - Landscape'
  },
  {
    image: 'https://images.pexels.com/photos/7679863/pexels-photo-7679863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Celebrity Brand Ambassador - Landscape'
  },
  {
    image: 'https://images.pexels.com/photos/7691283/pexels-photo-7691283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Fashion Editorial Spread - Landscape'
  },
  {
    image: 'https://images.pexels.com/photos/5325586/pexels-photo-5325586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Designer Fashion Collection - Landscape'
  },
  {
    image: 'https://images.pexels.com/photos/7691106/pexels-photo-7691106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Fashion Campaign Shoot - Landscape'
  },
  {
    image: 'https://images.pexels.com/photos/6567651/pexels-photo-6567651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Luxury Fashion Show - Landscape'
  },
  {
    image: 'https://images.pexels.com/photos/6567741/pexels-photo-6567741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Celebrity Style Showcase - Landscape'
  }
];

async function addLandscapeBanners() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing feature images
    await Feature.deleteMany({});
    console.log('Cleared existing banner images');
    
    // Add new landscape banner images
    const banners = [];
    for (const banner of landscapeBanners) {
      const newBanner = new Feature({
        image: banner.image
      });
      await newBanner.save();
      banners.push(newBanner);
      console.log(`Added landscape banner: ${banner.description}`);
    }
    
    console.log(`\nAdded ${banners.length} landscape-oriented banner images to the slider`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    return banners;
  } catch (error) {
    console.error('Error adding landscape banner images:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    throw error;
  }
}

// Run the function
addLandscapeBanners()
  .then(() => {
    console.log('Landscape banner images added successfully!');
  })
  .catch(err => {
    console.error('Failed to add landscape banner images:', err);
    process.exit(1);
  });
