import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import {
  PaginateResult,
  PaginateMetaResult,
} from 'src/common/resource/paginate.response';
import { PrismaService } from 'src/common/services/prisma.service';
import { AssignPermissionRoleDTO } from './dto/assign-permission-role.dto';
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

  async find(id: number) {
    const data = await this.prisma.role.findUniqueOrThrow({
      where: { id },
      include: { permissions: { include: { permission: true } } },
    });
    return {
      ...data,
      permissions: data.permissions.map((item) => item.permission),
    };
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

  async assignPermissions(data: AssignPermissionRoleDTO) {
    return this.prisma.role.update({
      where: { id: data.roleId },
      data: {
        permissions: {
          deleteMany: {},
          create: data.permssionIds.map((item) => {
            return { permissionId: item };
          }),
        },
      },
    });
  }
}
