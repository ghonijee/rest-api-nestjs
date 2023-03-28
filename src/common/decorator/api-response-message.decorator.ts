import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import {
  RESPONSE_MESSAGE,
  RESPONSE_OK_STATUS,
  RESPONSE_SERIALIZATION,
} from '../constant/response.constant';
import { ApiResponseDefaultInterceptor } from '../interceptor/api-response-default.interceptor';
import { IResponseOptions } from '../interfaces/response.interface';

export function ApiResponseMessageSuccess<T>(
  message: string,
  options?: IResponseOptions<T>,
): MethodDecorator {
  return applyDecorators(
    UseInterceptors(ApiResponseDefaultInterceptor<T>),
    SetMetadata(RESPONSE_MESSAGE, message),
    SetMetadata(RESPONSE_OK_STATUS, true),
    SetMetadata(
      RESPONSE_SERIALIZATION,
      options == null ? null : options.serialization,
    ),
  );
}

export function ApiResponseMessageFailed<T>(message: string): MethodDecorator {
  return applyDecorators(
    UseInterceptors(ApiResponseDefaultInterceptor<T>),
    SetMetadata(RESPONSE_MESSAGE, message),
    SetMetadata(RESPONSE_OK_STATUS, false),
  );
}
