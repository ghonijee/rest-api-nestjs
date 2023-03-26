import { applyDecorators, UseInterceptors, SetMetadata } from '@nestjs/common';
import {
  RESPONSE_MESSAGE,
  RESPONSE_OK_STATUS,
} from '../constant/response.constant';
import { ApiResponsePaginateInterceptor } from '../interceptor/api-response-paginate.interceptor';

export function ApiResponsePaginate<T>(message: string): MethodDecorator {
  return applyDecorators(
    UseInterceptors(ApiResponsePaginateInterceptor<T>),
    SetMetadata(RESPONSE_MESSAGE, message),
    SetMetadata(RESPONSE_OK_STATUS, true),
  );
}
