import { ApiProperty } from '@nestjs/swagger';

export class ApiException {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: [] | string;
}
