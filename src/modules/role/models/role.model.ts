import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Permission, Role } from '@prisma/client';

export class RoleModel implements Role {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional()
  permissions?: Permission[];
}
