import { prisma } from '../src/utils';
import { InvitationStatus } from '@prisma/client';

async function main() {
  console.log('Seeding database...');

  await prisma.user.create({
    data: {
      email: 'john@mail.com',
      status: InvitationStatus.VERIFIED,
      firstname: 'John',
      lastname: 'Doe',
      password: 'password',
    },
  });
  await prisma.airport.create({
    data: {
      name: 'Brussels Airport',
    },
  });

  console.log('Database seeded successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
