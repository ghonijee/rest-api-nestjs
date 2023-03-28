import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiOkResponsePaginated } from 'src/common/decorator/api-ok-response-paginate.decorator';
import { ApiResponsePaginate } from 'src/common/decorator/api-response-paginate.decorator';
import { PaginateFilterDTO } from 'src/common/dto/paginate-filter.dto';
import { IFindPaginate } from 'src/common/interfaces/service.interface';
import { ExceptionDefaultSerialization } from 'src/common/serialization/exception.default.serialization';
import { PermissionModel } from './models/permission.model';
import { PermissionService } from './permission.service';

@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private service: PermissionService) {}

  @Get('/')
  @ApiResponsePaginate('list permission with paginate')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponsePaginated(PermissionModel)
  @ApiBadRequestResponse({ type: ExceptionDefaultSerialization })
  @ApiInternalServerErrorResponse({ type: ExceptionDefaultSerialization })
  paginate(@Query() data: PaginateFilterDTO): Promise<IFindPaginate> {
    return this.service.findPaginate(data);
  }
}
