import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import {
  RESPONSE_MESSAGE,
  RESPONSE_OK_STATUS,
  RESPONSE_SERIALIZATION,
} from '../constant/response.constant';
import { IResponse } from '../interfaces/response.interface';
import { ResponseDefaultSerialization } from '../serialization/response.default.serialization';
import { Response } from 'express';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ApiResponseDefaultInterceptor<T>
  implements NestInterceptor<Promise<T>>
{
  constructor(private readonly reflector: Reflector) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Promise<ResponseDefaultSerialization>>> {
    if (context.getType() === 'http') {
      return next.handle().pipe(
        map(async (responseData: Promise<Record<string, any>>) => {
          const ctx: HttpArgumentsHost = context.switchToHttp();
          const responseExpress: Response = ctx.getResponse();
          const message: string = this.reflector.get<string>(
            RESPONSE_MESSAGE,
            context.getHandler(),
          );
          const okStatus: boolean = this.reflector.get<boolean>(
            RESPONSE_OK_STATUS,
            context.getHandler(),
          );
          const classSerialization: ClassConstructor<any> = this.reflector.get<
            ClassConstructor<any>
          >(RESPONSE_SERIALIZATION, context.getHandler());

          // default response
          const statusCode: number = responseExpress.statusCode;

          // response
          const response = (await responseData) as IResponse;
          if (response) {
            const { ...data } = response;
            let serialization = data;

            if (classSerialization) {
              serialization = plainToInstance(classSerialization, data);
            }

            return {
              status: okStatus,
              statusCode,
              message,
              data: serialization,
            };
          }

          return {
            status: okStatus,
            statusCode,
            message,
            data: null,
          };
        }),
      );
    }

    return next.handle();
  }
}
