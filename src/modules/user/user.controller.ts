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
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseMessageSuccess } from 'src/common/decorator/api-response-message.decorator';
import { ApiResponsePaginate } from 'src/common/decorator/api-response-paginate.decorator';
import { PaginateFilterDTO } from 'src/common/dto/paginate-filter.dto';
import { ChangePasswordUserDTO } from './dto/change-password-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  @ApiResponsePaginate('List data paginate', { serialization: UserModel })
  index(@Query() data: PaginateFilterDTO) {
    return this.service.findPaginate(data);
  }

  @Get(':id')
  @ApiResponseMessageSuccess('Show user detail', { serialization: UserModel })
  show(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  @ApiResponseMessageSuccess('Create user success', {
    serialization: UserModel,
  })
  store(@Body() data: CreateUserDTO) {
    return this.service.create(data);
  }

  @Patch(':id/change-password')
  @ApiResponseMessageSuccess('Update password success', {
    serialization: UserModel,
  })
  changePassword(@Param('id') id: string, @Body() data: ChangePasswordUserDTO) {
    return this.service.changePassword(+id, data);
  }

  @Patch(':id')
  @ApiResponseMessageSuccess('Update user success', {
    serialization: UserModel,
  })
  update(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  @ApiResponseMessageSuccess('Delete user success')
  delete(@Param('id') id: string) {
    return this.service.destory(+id);
  }
}
