import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiOkResponsePaginated } from 'src/common/decorator/api-ok-response-paginate.decorator';
import { ApiResponseMessageSuccess } from 'src/common/decorator/api-response-message.decorator';
import { ApiResponsePaginate } from 'src/common/decorator/api-response-paginate.decorator';
import { IFindPaginate } from 'src/common/interfaces/service.interface';
import { ApiException } from 'src/common/resource/api.exception.response';
import { ResponseDefaultSerialization } from 'src/common/serialization/response.default.serialization';
import { AssignPermissionRoleDTO } from './dto/assign-permission-role.dto';
import { CreateRoleDTO } from './dto/create.role.dto';
import { PaginateRoleDTO } from './dto/paginate.role.dto';
import { UpdateRoleDTO } from './dto/update.role.dto';
import { RoleModel } from './models/role.model';
import { RoleService } from './role.service';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(readonly service: RoleService) {}

  @Get()
  @ApiOkResponsePaginated(RoleModel)
  @ApiResponsePaginate('list role with paginate')
  index(@Query() data: PaginateRoleDTO): Promise<IFindPaginate> {
    return this.service.findPaginate(data);
  }

  @ApiResponseMessageSuccess('Detail role')
  @Get(':id')
  @ApiOkResponse({ type: RoleModel })
  show(@Param('id') id: string) {
    return this.service.find(+id);
  }

  @Post()
  @ApiResponseMessageSuccess('Create role')
  @ApiOkResponse({ type: RoleModel })
  store(@Body() data: CreateRoleDTO) {
    return this.service.create(data);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResponseDefaultSerialization<RoleModel> })
  @ApiResponseMessageSuccess('Update role')
  update(@Param('id') id: string, @Body() data: UpdateRoleDTO) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RoleModel })
  @ApiResponseMessageSuccess('Delete role')
  destroy(@Param('id') id: string) {
    return this.service.destroy(+id);
  }

  @ApiBadRequestResponse({ type: ApiException })
  @ApiInternalServerErrorResponse({ type: ApiException })
  @Post('/assign/permission')
  @ApiResponseMessageSuccess('Assignmen permission to role success')
  assignPermissions(@Body() data: AssignPermissionRoleDTO) {
    return this.service.assignPermissions(data);
  }
}
