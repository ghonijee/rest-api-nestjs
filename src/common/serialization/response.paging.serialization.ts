import { ApiProperty } from '@nestjs/swagger';
import { PaginateFilterDTO } from '../dto/paginate-filter.dto';
import { IResponsePaginateMeta } from '../interfaces/response.interface';

interface PaginateFilterData {
  requestData: PaginateFilterDTO;

  totalCount: number;
}

export class PaginateMetaResult {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly previous: number;

  @ApiProperty()
  readonly next: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ requestData, totalCount }: PaginateFilterData) {
    this.page = requestData.page;
    this.limit = requestData.limit;
    this.itemCount = totalCount;
    this.pageCount = Math.ceil(this.itemCount / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.previous = this.page > 1 ? this.page - 1 : null;
    this.hasNextPage = this.page < this.pageCount;
    this.next = this.page < this.pageCount ? this.page + 1 : null;
  }
}

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
