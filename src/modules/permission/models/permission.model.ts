import { Permission } from '@prisma/client';

class PermissionModel implements Permission {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
