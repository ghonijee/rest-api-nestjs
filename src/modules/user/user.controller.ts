import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseMessageSuccess } from 'src/common/decorator/api-response-message.decorator';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

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
}
