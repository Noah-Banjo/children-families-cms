'use strict';

const familiesData = require('../../data/families-seed');

module.exports = async () => {
  console.log('🚀 Starting Strapi bootstrap...');

  try {
    // Check if families already exist
    const existingFamiliesCount = await strapi.entityService.count('api::family.family');
    
    console.log(`📊 Found ${existingFamiliesCount} existing families in database`);

    // Only seed if no families exist
    if (existingFamiliesCount === 0) {
      console.log('🌱 No families found, starting seeding process...');
      
      // Create each family from seed data
      for (const familyData of familiesData) {
        try {
          const createdFamily = await strapi.entityService.create('api::family.family', {
            data: familyData
          });
          
          console.log(`✅ Created family: ${createdFamily.familyName}`);
        } catch (error) {
          console.error(`❌ Error creating family ${familyData.familyName}:`, error.message);
        }
      }
      
      console.log('🎉 Database seeding completed successfully!');
    } else {
      console.log('⏭️  Families already exist, skipping seeding process');
    }
  } catch (error) {
    console.error('💥 Error during bootstrap seeding:', error);
  }
  
  console.log('✨ Strapi bootstrap completed');
};