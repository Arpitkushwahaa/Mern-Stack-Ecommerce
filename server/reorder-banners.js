require('dotenv').config();
const mongoose = require('mongoose');
const Feature = require('./models/Feature');

// Celebrity and fashion icon banner images to be placed at the beginning
const celebrityBanners = [
  {
    image: 'https://images.unsplash.com/photo-1600603405959-6d623e92445c?q=80&w=2070&auto=format&fit=crop',
    description: 'Fashion Model Showcase'
  },
  {
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1974&auto=format&fit=crop',
    description: 'Fashion Week Collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop',
    description: 'Celebrity Style Inspiration'
  },
  {
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=2072&auto=format&fit=crop',
    description: 'Fashion Icon Collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop',
    description: 'Runway Fashion Trends'
  },
  {
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop',
    description: 'Celebrity Brand Ambassador'
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
    description: 'Fashion Model Shopping'
  },
  {
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop',
    description: 'Fashion Influencer Style'
  }
];

async function reorderBanners() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Get all existing banners
    const existingBanners = await Feature.find({});
    console.log(`Found ${existingBanners.length} existing banner images`);
    
    // Filter out the celebrity banners that we just added (last 8)
    const nonCelebrityBanners = existingBanners.slice(0, existingBanners.length - 8);
    console.log(`Identified ${nonCelebrityBanners.length} non-celebrity banners`);
    
    // Delete all banners
    await Feature.deleteMany({});
    console.log('Cleared all banner images');
    
    // First add the celebrity banners
    for (const banner of celebrityBanners) {
      const newBanner = new Feature({
        image: banner.image
      });
      await newBanner.save();
      console.log(`Re-added celebrity banner: ${banner.description}`);
    }
    
    // Then add the non-celebrity banners
    for (const banner of nonCelebrityBanners) {
      const newBanner = new Feature({
        image: banner.image
      });
      await newBanner.save();
      console.log(`Re-added existing banner`);
    }
    
    const totalBanners = await Feature.countDocuments();
    console.log(`\nReordered banners. Total banners: ${totalBanners}`);
    console.log(`Celebrity banners are now at the beginning of the slider.`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error reordering banner images:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    throw error;
  }
}

// Run the function
reorderBanners()
  .then(() => {
    console.log('Banner images reordered successfully!');
  })
  .catch(err => {
    console.error('Failed to reorder banner images:', err);
    process.exit(1);
  });
