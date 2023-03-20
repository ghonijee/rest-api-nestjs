import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt } from 'class-validator';

export class AssignPermissionRoleDTO {
  @ApiProperty()
  @IsInt()
  roleId: number;

  @IsArray()
  @ApiProperty()
  permssionIds: number[];
}
