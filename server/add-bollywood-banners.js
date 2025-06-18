require('dotenv').config();
const mongoose = require('mongoose');
const Feature = require('./models/Feature');

// Bollywood-inspired fashion campaign banner images
// These are landscape-oriented fashion campaign images that evoke Bollywood celebrity style
const bollywoodBanners = [
  {
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Bollywood Glamour Fashion'
  },
  {
    image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Bollywood Celebrity Style'
  },
  {
    image: 'https://images.pexels.com/photos/2850487/pexels-photo-2850487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Bollywood Fashion Icon'
  },
  {
    image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Bollywood Couture Collection'
  },
  {
    image: 'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Bollywood Designer Showcase'
  },
  {
    image: 'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Bollywood Ethnic Fashion'
  },
  {
    image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Bollywood Red Carpet Look'
  },
  {
    image: 'https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Bollywood Fashion Campaign'
  }
];

async function addBollywoodBanners() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Get existing banners to preserve them
    const existingBanners = await Feature.find({});
    console.log(`Found ${existingBanners.length} existing banner images to preserve`);
    
    // Add new Bollywood banner images
    const newBanners = [];
    for (const banner of bollywoodBanners) {
      const newBanner = new Feature({
        image: banner.image
      });
      await newBanner.save();
      newBanners.push(newBanner);
      console.log(`Added Bollywood banner: ${banner.description}`);
    }
    
    console.log(`\nAdded ${newBanners.length} Bollywood banner images to the slider`);
    console.log(`Total banners now: ${newBanners.length + existingBanners.length}`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    return newBanners;
  } catch (error) {
    console.error('Error adding Bollywood banner images:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    throw error;
  }
}

// Run the function
addBollywoodBanners()
  .then(() => {
    console.log('Bollywood banner images added successfully!');
  })
  .catch(err => {
    console.error('Failed to add Bollywood banner images:', err);
    process.exit(1);
  });
