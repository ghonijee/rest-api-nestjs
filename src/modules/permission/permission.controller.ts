import { Controller, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private service: PermissionService) {}
  @Get('/')
  paginate() {
    return this.service.findPaginate();
  }
}
