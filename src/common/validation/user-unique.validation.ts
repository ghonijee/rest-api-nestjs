import { UnprocessableEntityException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'unique', async: true })
export class UserUniqueValidation implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const prisma = new PrismaClient();
    const key: string = args.property;
    return prisma.user
      .findFirst({
        where: {
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
