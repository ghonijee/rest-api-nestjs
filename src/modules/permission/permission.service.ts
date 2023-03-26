import { Injectable } from '@nestjs/common';
import { PaginateFilterDTO } from 'src/common/dto/paginate-filter.dto';
import { IFindPaginate } from 'src/common/interfaces/service.interface';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async findPaginate(params: PaginateFilterDTO): Promise<IFindPaginate> {
    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.permission.findMany({
        skip: (params.page - 1) * params.limit,
        take: params.limit,
      }),
      this.prisma.permission.count(),
    ]);
    return {
      data,
      totalCount,
    };
  }
}
