import type { Core } from '@strapi/strapi';

const familiesData = require('../data/families-seed');

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    console.log('🚀 Starting Strapi bootstrap...');

    try {
      const existingFamiliesCount = await strapi.entityService.count('api::family.family');
      console.log(`📊 Found ${existingFamiliesCount} existing families in database`);

      if (existingFamiliesCount === 0) {
        console.log('🌱 No families found, starting seeding process...');
        
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
  },
};