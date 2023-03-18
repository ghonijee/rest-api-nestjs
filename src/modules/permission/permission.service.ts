import { Injectable } from '@nestjs/common';
import { PaginateFilterDTO } from 'src/common/dto/paginate-filter.dto';
import {
  PaginateMetaResult,
  PaginateResult,
} from 'src/common/resource/paginate.response';
import { PrismaService } from 'src/common/services/prisma.service';
import { PermissionModel } from './models/permission.model';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async findPaginate(
    data: PaginateFilterDTO,
  ): Promise<PaginateResult<PermissionModel>> {
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
    return new PaginateResult<PermissionModel>(
      result,
      new PaginateMetaResult({ requestData: data, totalCount: totalCount }),
    );
  }
}
