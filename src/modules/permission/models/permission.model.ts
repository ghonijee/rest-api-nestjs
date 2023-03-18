import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@prisma/client';

export class PermissionModel implements Permission {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
