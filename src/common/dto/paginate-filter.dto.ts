import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { toNumber } from '../helpers/cast.helper';

export class PaginateFilterDTO {
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

  // @IsString()
  // @IsOptional()
  // @ApiPropertyOptional()
  // filter?: string;

  // @IsString()
  // @IsOptional()
  // @ApiPropertyOptional()
  // orderBy?: string;

  // @IsString()
  // @IsOptional()
  // @ApiPropertyOptional()
  // order?: string;
}
