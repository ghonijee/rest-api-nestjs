import { UnprocessableEntityException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UpdateUserDTO } from '../dto/update-user.dto';

@ValidatorConstraint({ name: 'unique', async: true })
export class UserUniqueExceptValidation
  implements ValidatorConstraintInterface
{
  validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const prisma = new PrismaClient();
    const key: string = args.property;
    const data: UpdateUserDTO = args.object as UpdateUserDTO;
    return prisma.user
      .findFirst({
        where: {
          id: { not: data.id },
          [key]: value,
        },
      })
      .then((user) => {
        if (user) {
          throw new UnprocessableEntityException(key + ' already exists');
        }
        return true;
      });
  }
}
