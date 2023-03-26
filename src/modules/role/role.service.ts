import { Injectable } from '@nestjs/common';
import { IFindPaginate } from 'src/common/interfaces/service.interface';
import { PrismaService } from 'src/common/services/prisma.service';
import { AssignPermissionRoleDTO } from './dto/assign-permission-role.dto';
import { CreateRoleDTO } from './dto/create.role.dto';
import { PaginateRoleDTO } from './dto/paginate.role.dto';
import { UpdateRoleDTO } from './dto/update.role.dto';

@Injectable()
export class RoleService {
  constructor(readonly prisma: PrismaService) {}

  async findPaginate(data: PaginateRoleDTO): Promise<IFindPaginate> {
    const [result, totalCount] = await this.prisma.$transaction([
      this.prisma.role.findMany({
        skip: data.skip,
        take: data.limit,
      }),
      this.prisma.role.count(),
    ]);

    return { data: result, totalCount };
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
