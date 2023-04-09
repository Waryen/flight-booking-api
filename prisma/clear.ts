import { prisma } from '../src/utils';

async function clear() {
  console.log('Clearing the database');
  await prisma.airport.deleteMany({});
  await prisma.user.deleteMany({});
}

clear().then(() => console.log('Database cleared successfully'));
