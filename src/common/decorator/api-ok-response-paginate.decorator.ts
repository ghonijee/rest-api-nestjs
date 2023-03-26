import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponsePaginateSerialization } from '../serialization/response.paging.serialization';

/**
 * Decorator for generate scheme response for swagger API Docs
 * @param dataDto
 */
export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
): MethodDecorator =>
  applyDecorators(
    ApiExtraModels(ResponsePaginateSerialization, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponsePaginateSerialization) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  );
