import { Module } from '@nestjs/common';
import { PrismaService } from './common/services/prisma.service';
import { PermissionModule } from './modules/permission/permission.module';

@Module({
  imports: [PermissionModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
