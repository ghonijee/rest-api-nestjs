import { applyDecorators, UseInterceptors, SetMetadata } from '@nestjs/common';
import {
  RESPONSE_MESSAGE,
  RESPONSE_OK_STATUS,
  RESPONSE_SERIALIZATION,
} from '../constant/response.constant';
import { ApiResponsePaginateInterceptor } from '../interceptor/api-response-paginate.interceptor';
import { IResponseOptions } from '../interfaces/response.interface';

export function ApiResponsePaginate<T>(
  message: string,
  options?: IResponseOptions<T>,
): MethodDecorator {
  return applyDecorators(
    UseInterceptors(ApiResponsePaginateInterceptor<T>),
    SetMetadata(RESPONSE_MESSAGE, message),
    SetMetadata(RESPONSE_OK_STATUS, true),
    SetMetadata(
      RESPONSE_SERIALIZATION,
      options == null ? null : options.serialization,
    ),
  );
}
