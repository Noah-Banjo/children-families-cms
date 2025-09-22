import type { Core } from '@strapi/strapi';
import path from 'path';
import fs from 'fs';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    console.log('🚀 Starting Strapi bootstrap...');

    try {
      // Define families data directly in the file to avoid path issues
      const familiesData = [
        {
          familyName: "The Bridges Family",
          timePeriod: "1957-1960",
          location: "Little Rock, Arkansas",
          childrenNames: "Elizabeth Eckford",
          description: "Elizabeth Eckford was one of the Little Rock Nine, the first nine African American students to integrate Central High School in Little Rock, Arkansas, in 1957. Her courage in the face of hostile crowds became an iconic symbol of the civil rights movement.",
          publishedAt: new Date().toISOString()
        },
        {
          familyName: "The Johnson Family",
          timePeriod: "1958-1961",
          location: "Little Rock, Arkansas",
          childrenNames: "Michael Johnson, Sarah Johnson",
          description: "The Johnson family experienced the integration crisis firsthand when their children attended Central High School during the tumultuous years following the initial integration attempt.",
          publishedAt: new Date().toISOString()
        },
        {
          familyName: "The Williams Family",
          timePeriod: "1957-1959",
          location: "Little Rock, Arkansas", 
          childrenNames: "David Williams",
          description: "David Williams was among the students who witnessed the historic events at Central High School, providing a unique perspective on the integration process from a student's viewpoint.",
          publishedAt: new Date().toISOString()
        }
      ];

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