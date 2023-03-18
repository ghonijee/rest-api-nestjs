import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiOkResponsePaginated } from 'src/common/decorator/api-ok-response-paginate.decorator';
import { PaginateFilterDTO } from 'src/common/dto/paginate-filter.dto';
import { ApiException } from 'src/common/resource/api.exception.response';
import { PaginateResult } from 'src/common/resource/paginate.response';
import { PermissionModel } from './models/permission.model';
import { PermissionService } from './permission.service';

@ApiTags('permission')
@Controller('permission')
export class PermissionController {
  constructor(private service: PermissionService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponsePaginated(PermissionModel)
  @ApiBadRequestResponse({ type: ApiException })
  @ApiInternalServerErrorResponse({ type: ApiException })
  paginate(
    @Query() data: PaginateFilterDTO,
  ): Promise<PaginateResult<PermissionModel> | Error> {
    return this.service.findPaginate(data);
  }
}
