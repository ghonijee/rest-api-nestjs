import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateRoleDTO {
  @IsString()
  @ApiProperty()
  name: string;

  @IsBoolean()
  @ApiProperty({ required: false, default: true })
  isActive = false;
}
