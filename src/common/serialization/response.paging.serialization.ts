import { ApiProperty } from '@nestjs/swagger';
import { PaginateFilterDTO } from '../dto/paginate-filter.dto';
import { IResponsePaginateMeta } from '../interfaces/response.interface';

export class ResponsePaginateSerialization {
  @ApiProperty()
  status: boolean;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: [];

  @ApiProperty()
  meta: IResponsePaginateMeta;
}
