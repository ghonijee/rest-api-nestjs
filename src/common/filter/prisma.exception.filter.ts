import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpServer,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

export type ErrorCodesStatusMapping = {
  [key: string]: number;
};

/**
 * {@link PrismaClientExceptionFilter}
 * catches {@link Prisma.PrismaClientKnownRequestError}
 * and {@link Prisma.PrismaClientValidationError} exceptions.
 */
@Catch(
  Prisma?.PrismaClientKnownRequestError,
  Prisma?.PrismaClientValidationError,
)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  /**
   * default error codes mapping
   *
   * Error codes definition for Prisma Client (Query Engine)
   * @see https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
   */
  private errorCodesStatusMapping: ErrorCodesStatusMapping = {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
  };

  /**
   * @param applicationRef
   * @param errorCodesStatusMapping
   */
  constructor(
    applicationRef?: HttpServer,
    errorCodesStatusMapping?: ErrorCodesStatusMapping,
  ) {
    super(applicationRef);

    if (errorCodesStatusMapping) {
      this.errorCodesStatusMapping = Object.assign(
        this.errorCodesStatusMapping,
        errorCodesStatusMapping,
      );
    }
  }

  /**
   * @param exception
   * @param host
   * @returns
   */
  catch(
    exception:
      | Prisma.PrismaClientKnownRequestError
      | Prisma.PrismaClientValidationError
      | any,
    host: ArgumentsHost,
  ) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return this.catchClientKnownRequestError(exception, host);
    }

    if (exception instanceof Prisma.PrismaClientValidationError) {
      return this.catchPrismaClientValidationError(exception, host);
    }

    super.catch(
      new HttpException(exception, HttpStatus.INTERNAL_SERVER_ERROR),
      host,
    );
  }

  private catchClientKnownRequestError(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    const statusCode = this.errorCodesStatusMapping[exception.code];
    const message = `[${exception.code}]: ${this.exceptionShortMessage(
      exception.message,
    )}`;

    if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
      return super.catch(exception, host);
    }

    super.catch(new HttpException({ statusCode, message }, statusCode), host);
  }

  private catchPrismaClientValidationError(
    exception: Prisma.PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const statusCode = HttpStatus.BAD_REQUEST;
    const message = this.exceptionShortMessage(exception.message);

    super.catch(new HttpException(message, statusCode), host);
  }

  private exceptionShortMessage(message: string): string {
    const shortMessage = message.substring(message.indexOf('})'));

    return shortMessage
      .substring(shortMessage.indexOf('\n'))
      .replace(/\n/g, '')
      .trim();
  }
}
