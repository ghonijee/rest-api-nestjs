import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { PaginateFilterDTO } from 'src/common/dto/paginate-filter.dto';
import { IFindPaginate } from 'src/common/interfaces/service.interface';
import { PrismaService } from 'src/common/services/prisma.service';
import { Config } from 'src/config/config';
import { ChangePasswordUserDTO } from './dto/change-password-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findPaginate(data: PaginateFilterDTO): Promise<IFindPaginate> {
    const [result, totalCount] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: data.skip,
        take: data.limit,
      }),
      this.prisma.user.count(),
    ]);

    return { data: result, totalCount };
  }

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

  async changePassword(id: number, data: ChangePasswordUserDTO) {
    const user = await this.prisma.user.findFirst({ where: { id: id } });
    if (user == null) {
      throw new HttpException('User ID not found', HttpStatus.NOT_FOUND);
    }

    if (await compare(data.oldPassword, user.password)) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }
    const encrypPassword = await hash(
      data.newPassword,
      Config.SALT_OR_ROUNDS_PASSWORD,
    );

    return this.prisma.user.update({
      where: { id: id },
      data: {
        password: encrypPassword,
      },
    });
  }

  async update(id: number, data: UpdateUserDTO) {
    const role = await this.prisma.role.findFirst({
      where: { id: data.roleId },
    });

    if (role == null) {
      throw new HttpException('Role ID not found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.user.update({
      data: data,
      where: { id: id },
    });
  }

  destory(id: number) {
    return this.prisma.user.delete({
      where: { id: id },
    });
  }
}
