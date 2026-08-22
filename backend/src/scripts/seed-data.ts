import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const DATA_DIR = path.join(__dirname, '../../../../data');

// Helper to read CSV
const readCSV = async (filename: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(path.join(DATA_DIR, filename))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

async function seedCities() {
  console.log('Seeding Cities...');
  const cities = await readCSV('cities.csv.csv');
  
  // Transform and chunk
  const chunkSize = 2000;
  for (let i = 0; i < cities.length; i += chunkSize) {
    const chunk = cities.slice(i, i + chunkSize).map(c => ({
      city: c.city,
      latitude: parseFloat(c.latitude) || 0,
      longitude: parseFloat(c.longitude) || 0,
      country: c.country,
      population: c.population ? BigInt(Math.floor(Number(c.population))) : null,
    }));
    
    await prisma.city.createMany({
      data: chunk,
      skipDuplicates: true,
    });
    console.log(`  Inserted ${i + chunk.length} of ${cities.length} cities`);
  }
  console.log('✅ Cities seeded.');
}

async function seedActivities() {
  console.log('Seeding Activities...');
  const activities = await readCSV('activities.csv.csv');
  
  const chunkSize = 1000;
  for (let i = 0; i < activities.length; i += chunkSize) {
    const chunk = activities.slice(i, i + chunkSize).map(a => ({
      destinationName: a.destination_name,
      country: a.country,
      continent: a.continent,
      category: a.category,
      cost: parseFloat(a.cost) || 0,
      bestSeason: a.best_season,
      rating: parseFloat(a.rating) || 0,
    }));

    await prisma.destinationActivity.createMany({
      data: chunk,
      skipDuplicates: true,
    });
    console.log(`  Inserted ${i + chunk.length} of ${activities.length} activities`);
  }
  console.log('✅ Activities seeded.');
}

async function seedCostOfLiving() {
  console.log('Seeding Cost of Living...');
  const colData = await readCSV('cost_of_living.csv.csv');
  
  for (const row of colData) {
    // Try to find matching city to link
    const cityRecord = await prisma.city.findFirst({
      where: {
        city: row.city,
        country: row.country
      }
    });

    await prisma.costOfLiving.create({
      data: {
        rank: parseInt(row.rank),
        city: row.city,
        country: row.country,
        region: row.region,
        costIndex: parseFloat(row.cost_index),
        rentIndex: parseFloat(row.rent_index),
        groceriesIndex: parseFloat(row.groceries_index),
        mealCostIndex: parseFloat(row.meal_cost_index),
        localPurchasingPowerIndex: parseFloat(row.local_purchasing_power_index),
        populationCityMillions: parseFloat(row.population_city_millions) || null,
        costCrisisTier: parseInt(row.cost_crisis_tier),
        costCategory: row.cost_category,
        cityRefId: cityRecord ? cityRecord.id : null
      }
    });
  }
  console.log('✅ Cost of Living seeded.');
}

async function main() {
  try {
    console.log('Clearing old data...');
    // Clear in reverse order of dependencies
    await prisma.costOfLiving.deleteMany({});
    await prisma.destinationActivity.deleteMany({});
    await prisma.city.deleteMany({});
    
    await seedCities();
    await seedActivities();
    await seedCostOfLiving();
    
    console.log('🎉 All data seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
