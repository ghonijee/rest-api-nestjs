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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkResponsePaginated } from 'src/common/decorator/api-ok-response-paginate.decorator';
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
  index(@Query() data: PaginateRoleDTO) {
    return this.service.findPaginate(data);
  }

  @Get(':id')
  @ApiOkResponse({ type: RoleModel })
  show(@Param(':id') id: number) {
    return this.service.find(id);
  }

  @Post()
  @ApiOkResponse({ type: RoleModel })
  store(@Body() data: CreateRoleDTO) {
    return this.service.create(data);
  }

  @Patch(':id')
  @ApiOkResponse({ type: RoleModel })
  update(@Param(':id') id: number, @Body() data: UpdateRoleDTO) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RoleModel })
  destroy(@Param(':id') id: number) {
    return this.service.destroy(id);
  }
}
