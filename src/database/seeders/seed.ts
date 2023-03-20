// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { permissionSeed } from './permissions.seed';
import { roleSeed } from './roles.seed';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await permissionSeed(prisma);
  await roleSeed(prisma);
}

// execute the permissionSeed function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
