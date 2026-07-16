require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const result = await prisma.user.updateMany({
    data: { isOnboarded: false },
  });
  console.log("Utilisateurs réinitialisés :", result.count);
  await prisma.$disconnect();
}

main().catch(console.error);
