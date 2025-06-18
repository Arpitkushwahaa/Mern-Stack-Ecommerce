// Simple script to test the products API
require('dotenv').config();
const axios = require('axios');

const API_URL = 'http://localhost:5000/api/shop/products/get';

async function testProductsAPI() {
  try {
    console.log('Testing Products API...');
    console.log(`Making request to: ${API_URL}`);
    
    const response = await axios.get(API_URL);
    
    console.log('API Response Status:', response.status);
    console.log('Success:', response.data.success);
    console.log('Number of products:', response.data.data.length);
    
    if (response.data.data.length > 0) {
      console.log('\nSample product:');
      const sample = response.data.data[0];
      console.log('- Title:', sample.title);
      console.log('- Category:', sample.category);
      console.log('- Brand:', sample.brand);
      console.log('- Price:', sample.price);
    } else {
      console.log('\nNo products found in the database.');
      
      // Add a sample product if none exist
      console.log('\nAdding a sample product...');
      
      const sampleProduct = {
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        title: 'Premium Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        category: 'Electronics',
        brand: 'SoundMaster',
        price: 199.99,
        salePrice: 149.99,
        totalStock: 50,
        averageReview: 4.5
      };
      
      const addResponse = await axios.post('http://localhost:5000/api/admin/products/add', sampleProduct);
      console.log('Product added:', addResponse.data.success);
    }
    
  } catch (error) {
    console.error('Error testing API:');
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
  }
}

// Run the test
testProductsAPI();
