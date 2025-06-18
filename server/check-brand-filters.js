// Script to check if products are correctly assigned to brand filters
require('dotenv').config();
const axios = require('axios');

const API_URL = 'http://localhost:5000/api/shop/products/get';

// These are the exact brand IDs used in the filter configuration
const brandIds = ['nike', 'adidas', 'puma', 'levi', 'zara', 'h&m'];

async function checkBrandFilters() {
  try {
    console.log('Checking brand filters...');
    console.log(`Making request to: ${API_URL}`);
    
    const response = await axios.get(API_URL);
    
    console.log('API Response Status:', response.status);
    console.log('Success:', response.data.success);
    console.log('Total Products:', response.data.data.length);
    
    // Count products by brand (case-insensitive)
    const brandCounts = {};
    response.data.data.forEach(product => {
      const brand = product.brand.toLowerCase();
      if (!brandCounts[brand]) {
        brandCounts[brand] = 0;
      }
      brandCounts[brand]++;
    });
    
    // Check each filter brand ID
    console.log('\nProducts by filter brand ID:');
    brandIds.forEach(brandId => {
      const count = brandCounts[brandId] || 0;
      console.log(`- ${brandId}: ${count} products`);
    });
    
    // List other brands that don't match filter IDs
    console.log('\nOther brands in database:');
    Object.entries(brandCounts)
      .filter(([brand]) => !brandIds.includes(brand))
      .forEach(([brand, count]) => {
        console.log(`- ${brand}: ${count} products`);
      });
    
  } catch (error) {
    console.error('Error checking brand filters:');
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

// Run the check
checkBrandFilters();
