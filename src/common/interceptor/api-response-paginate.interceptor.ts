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
} from '../constant/response.constant';
import { Response } from 'express';
import { ResponsePaginateSerialization } from '../serialization/response.paging.serialization';
import { IFindPaginate } from '../interfaces/service.interface';
import { PaginateFilterDTO } from '../dto/paginate-filter.dto';

@Injectable()
export class ApiResponsePaginateInterceptor<T>
  implements NestInterceptor<Promise<T>>
{
  constructor(private readonly reflector: Reflector) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Promise<ResponsePaginateSerialization>>> {
    if (context.getType() !== 'http') {
      return next.handle();
    }
    return next.handle().pipe(
      map(async (responseData: Promise<Record<string, any>>) => {
        const ctx: HttpArgumentsHost = context.switchToHttp();
        const responseExpress: Response = ctx.getResponse();
        const requestExpress = ctx.getRequest().query as PaginateFilterDTO;

        const message: string = this.reflector.get<string>(
          RESPONSE_MESSAGE,
          context.getHandler(),
        );
        const okStatus: boolean = this.reflector.get<boolean>(
          RESPONSE_OK_STATUS,
          context.getHandler(),
        );

        // default response
        const statusCode: number = responseExpress.statusCode;

        // response
        const response = (await responseData) as IFindPaginate;

        return {
          message: message,
          status: okStatus,
          statusCode: statusCode,
          meta: {
            page: requestExpress.page,
            limit: requestExpress.limit,
            itemCount: response.totalCount,
            pageCount: Math.ceil(response.totalCount / requestExpress.limit),
            hasPreviousPage: requestExpress.page > 1,
            previous: requestExpress.page > 1 ? requestExpress.page - 1 : null,
            hasNextPage:
              requestExpress.page <
              Math.ceil(response.totalCount / requestExpress.limit),
            next:
              requestExpress.page <
              Math.ceil(response.totalCount / requestExpress.limit)
                ? requestExpress.page + 1
                : null,
          },
          data: response.data,
        };
      }),
    );
  }
}
