import { ApiProperty } from '@nestjs/swagger';

export class ExceptionDefaultSerialization {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: [] | string;
}
