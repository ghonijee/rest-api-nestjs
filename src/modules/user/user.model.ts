import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserModel implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  roleId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional()
  role: Role;
}
