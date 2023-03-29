import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { UserUniqueValidation } from 'src/modules/user/validation/user-unique.validation';

export class CreateUserDTO {
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

  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 0,
    minLowercase: 0,
    minUppercase: 0,
    minSymbols: 0,
  })
  @ApiProperty()
  password: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1 })
  roleId: number;
}
