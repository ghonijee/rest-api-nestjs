import { Module } from '@nestjs/common';
import { PermissionModule } from './modules/permission/permission.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PermissionModule, CommonModule, RoleModule, UserModule],
})
export class AppModule {}
