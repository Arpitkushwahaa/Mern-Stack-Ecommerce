// Script to remove duplicate 'H and M pajama sets' products, keeping only one
const mongoose = require('mongoose');
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-ecommerce'; // Change if needed

async function removeDuplicates() {
  await mongoose.connect(MONGO_URI);
  const products = await Product.find({
    title: /H and M pajama sets/i
  });
  if (products.length <= 1) {
    console.log('No duplicates found or only one product exists.');
    await mongoose.disconnect();
    return;
  }
  // Keep the first, remove the rest
  const [keep, ...duplicates] = products;
  const idsToDelete = duplicates.map(p => p._id);
  await Product.deleteMany({ _id: { $in: idsToDelete } });
  console.log(`Removed ${idsToDelete.length} duplicates, kept one.`);
  await mongoose.disconnect();
}

removeDuplicates().catch(e => {
  console.error(e);
  mongoose.disconnect();
});
