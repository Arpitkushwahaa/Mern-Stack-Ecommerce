// Simple script to test the products API and check brands
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
    
    // Count products by brand
    const brandCounts = {};
    response.data.data.forEach(product => {
      if (!brandCounts[product.brand]) {
        brandCounts[product.brand] = 0;
      }
      brandCounts[product.brand]++;
    });
    
    console.log('\nProducts by brand:');
    Object.entries(brandCounts).forEach(([brand, count]) => {
      console.log(`- ${brand}: ${count} products`);
    });
    
    // Count products by category
    const categoryCounts = {};
    response.data.data.forEach(product => {
      if (!categoryCounts[product.category]) {
        categoryCounts[product.category] = 0;
      }
      categoryCounts[product.category]++;
    });
    
    console.log('\nProducts by category:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`- ${category}: ${count} products`);
    });
    
  } catch (error) {
    console.error('Error testing API:');
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received from server');
    } else {
      console.error('Error message:', error.message);
    }
  }
}

// Run the test
testProductsAPI();
