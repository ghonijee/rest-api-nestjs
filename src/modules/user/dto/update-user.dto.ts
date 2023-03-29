import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { UserUniqueExceptValidation } from '../validation/user-unique-except.validation';

export class UpdateUserDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @IsString()
  @ApiProperty({ example: 'superadmin user' })
  fullname: string;

  @IsString()
  @Validate(UserUniqueExceptValidation)
  @IsOptional()
  @ApiProperty({ example: 'superadmin' })
  username: string;

  @IsEmail()
  @Validate(UserUniqueExceptValidation)
  @ApiProperty({
    example: 'superadmin@mail.com',
  })
  email: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1 })
  roleId: number;
}
