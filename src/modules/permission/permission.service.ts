import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  findPaginate() {
    return this.prisma.permission.findMany();
  }
}
