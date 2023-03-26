import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import {
  RESPONSE_MESSAGE,
  RESPONSE_OK_STATUS,
} from '../constant/response.constant';
import { ApiResponseDefaultInterceptor } from '../interceptor/api-response-default.interceptor';

export function ApiResponseMessageSuccess<T>(message: string): MethodDecorator {
  return applyDecorators(
    UseInterceptors(ApiResponseDefaultInterceptor<T>),
    SetMetadata(RESPONSE_MESSAGE, message),
    SetMetadata(RESPONSE_OK_STATUS, true),
  );
}

export function ApiResponseMessageFailed<T>(message: string): MethodDecorator {
  return applyDecorators(
    UseInterceptors(ApiResponseDefaultInterceptor<T>),
    SetMetadata(RESPONSE_MESSAGE, message),
    SetMetadata(RESPONSE_OK_STATUS, false),
  );
}
