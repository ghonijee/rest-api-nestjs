import { Prisma, PrismaClient } from '@prisma/client';

export async function roleSeed(
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >,
) {
  await prisma.role.upsert({
    create: {
      name: 'superadmin',
      isActive: true,
    },
    update: {
      name: 'superadmin',
    },
    where: {
      name: 'superadmin',
    },
  });
}
