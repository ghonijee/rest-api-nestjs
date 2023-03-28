import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { UserUniqueValidation } from 'src/common/validation/user-unique.validation';

export class UpdateUserDTO {
  @IsString()
  @ApiProperty({ example: 'superadmin user' })
  fullname: string;

  @IsString()
  @Validate(UserUniqueValidation)
  @IsOptional()
  @ApiProperty({ example: 'superadmin' })
  username: string;

  @IsEmail()
  @Validate(UserUniqueValidation)
  @ApiProperty({
    example: 'superadmin@mail.com',
  })
  email: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1 })
  roleId: number;
}
