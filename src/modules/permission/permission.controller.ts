import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Permission } from '@prisma/client';
import { PaginateFilterDTO } from 'src/common/dto/paginate-filterdto';
import { PaginateResult } from 'src/common/resource/paginate.response';
import { PermissionService } from './permission.service';

@ApiTags('permission')
@Controller('permission')
export class PermissionController {
  constructor(private service: PermissionService) {}

  @Get('/')
  @ApiCreatedResponse({ type: PaginateResult<Permission> })
  @HttpCode(HttpStatus.OK)
  paginate(@Query() data: PaginateFilterDTO) {
    try {
      return this.service.findPaginate(data);
    } catch (error) {
      throw error;
    }
  }
}
