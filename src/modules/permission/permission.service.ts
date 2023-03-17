import { Injectable } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PaginateFilterDTO } from 'src/common/dto/paginate-filterdto';
import {
  PaginateMetaResult,
  PaginateResult,
} from 'src/common/resource/paginate.response';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async findPaginate(
    data: PaginateFilterDTO,
  ): Promise<PaginateResult<Permission>> {
    const [result, totalCount] = await this.prisma.$transaction([
      this.prisma.permission.findMany({
        skip: (data.page - 1) * data.limit,
        take: data.limit,
        orderBy: {
          [data.orderBy]: data.order,
        },
        where: {
          name: { contains: data.filter },
        },
      }),
      this.prisma.permission.count({
        where: {
          name: { contains: data.filter },
        },
      }),
    ]);
    return new PaginateResult(
      result,
      new PaginateMetaResult({ requestData: data, totalCount: totalCount }),
    );
  }
}
