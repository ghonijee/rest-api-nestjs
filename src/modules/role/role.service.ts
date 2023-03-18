import { Injectable } from '@nestjs/common';
import {
  PaginateResult,
  PaginateMetaResult,
} from 'src/common/resource/paginate.response';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateRoleDTO } from './dto/create.role.dto';
import { PaginateRoleDTO } from './dto/paginate.role.dto';
import { UpdateRoleDTO } from './dto/update.role.dto';
import { RoleModel } from './models/role.model';

@Injectable()
export class RoleService {
  constructor(readonly prisma: PrismaService) {}

  async findPaginate(data: PaginateRoleDTO) {
    const [result, totalCount] = await this.prisma.$transaction([
      this.prisma.role.findMany({
        skip: data.skip,
        take: data.limit,
      }),
      this.prisma.role.count(),
    ]);

    return new PaginateResult<RoleModel>(
      result,
      new PaginateMetaResult({ requestData: data, totalCount: totalCount }),
    );
  }

  find(id: number) {
    return this.prisma.role.findFirst({ where: { id } });
  }

  create(data: CreateRoleDTO) {
    return this.prisma.role.create({ data: data });
  }

  update(id: number, data: UpdateRoleDTO) {
    return this.prisma.role.update({
      where: { id },
      data: data,
    });
  }

  destroy(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
