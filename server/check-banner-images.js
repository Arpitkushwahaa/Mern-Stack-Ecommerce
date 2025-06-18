require('dotenv').config();
const axios = require('axios');

const API_URL = 'http://localhost:5000/api/common/feature/get';

async function checkBannerImages() {
  try {
    console.log('Checking banner images...');
    console.log(`Making request to: ${API_URL}`);
    
    const response = await axios.get(API_URL);
    
    console.log('API Response Status:', response.status);
    console.log('Success:', response.data.success);
    
    if (response.data.success && response.data.data) {
      console.log(`\nFound ${response.data.data.length} banner images:`);
      
      response.data.data.forEach((banner, index) => {
        console.log(`${index + 1}. ${banner.image.substring(0, 60)}...`);
      });
    } else {
      console.log('No banner images found');
    }
    
  } catch (error) {
    console.error('Error checking banner images:');
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
checkBannerImages();
