import { Prisma, PrismaClient } from '@prisma/client';

export async function permissionSeed(
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >,
) {
  const permissions: string[] = [
    'role-create',
    'role-update',
    'role-delete',
    'role-show',
    'user-create',
    'user-update',
    'user-delete',
    'user-show',
  ];

  for (const permission of permissions) {
    await prisma.permission.create({
      data: {
        name: permission,
      },
    });
  }
}
