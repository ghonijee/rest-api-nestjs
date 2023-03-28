import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/common/services/prisma.service';
import { Config } from 'src/config/config';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    return this.prisma.user.findFirstOrThrow({
      where: { id: id },
      include: { role: true },
    });
  }

  async create(data: CreateUserDTO) {
    const role = await this.prisma.role.findFirst({
      where: { id: data.roleId },
    });

    if (role == null) {
      throw new HttpException('Role ID not found', HttpStatus.NOT_FOUND);
    }
    const encrypPassword = await hash(
      data.password,
      Config.SALT_OR_ROUNDS_PASSWORD,
    );
    data.password = encrypPassword;

    return this.prisma.user.create({ data: data });
  }
}
