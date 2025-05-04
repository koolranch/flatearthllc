import { PrismaClient } from "./generated/prisma/index.js";
import * as dotenv from 'dotenv';
import * as fs from 'fs';

// Load environment variables
if (fs.existsSync('.env.local')) {
  console.log('Loading .env.local');
  dotenv.config({ path: '.env.local' });
} else {
  console.log('No .env.local file found');
  dotenv.config();
}

console.log('DATABASE_URL:', process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 30) + '...' : 'not set');

const prisma = new PrismaClient();

async function main() {
  console.log("Connecting to database...");
  try {
    const count = await prisma.part.count();
    console.log("🗄️  Parts rows in DB →", count);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await prisma.$disconnect();
    console.log("Database connection closed");
  }
}

main(); 