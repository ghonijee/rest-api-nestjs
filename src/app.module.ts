import { Module } from '@nestjs/common';
import { PermissionModule } from './modules/permission/permission.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [PermissionModule, CommonModule],
})
export class AppModule {}
