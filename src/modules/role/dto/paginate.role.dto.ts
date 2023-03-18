import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsArray } from 'class-validator';
import { toNumber } from 'src/common/helpers/cast.helper';

export class PaginateRoleDTO {
  @ApiProperty({ default: 1 })
  @Transform(({ value }) => toNumber(value), {
    toClassOnly: true,
  })
  @IsInt()
  page: number;

  @ApiProperty({ default: 10 })
  @Transform(({ value }) => toNumber(value), {
    toClassOnly: true,
  })
  @IsInt()
  limit: number;

  @ApiProperty({ default: 0 })
  @Transform(({ value }) => toNumber(value))
  @IsInt()
  skip: number;
}

interface filterData {
  path: string;
  operator: string;
  value: any;
}
