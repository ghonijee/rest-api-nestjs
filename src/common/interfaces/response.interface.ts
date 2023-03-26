import { Response } from 'express';

export interface IResponseMetadata {
  statusCode?: number;
  message?: string;
  [key: string]: any;
}

export interface IResponse {
  _metadata?: IResponseMetadata;
  [key: string]: any;
}

export interface IResponsePaginate {
  status?: boolean;
  statusCode?: number;
  message?: string;
  data: [];
  meta: IResponsePaginateMeta;
}

export interface IResponseCustom extends Response {
  body: string;
}

export interface IResponsePaginateMeta {
  page: number;

  limit: number;

  itemCount: number;

  pageCount: number;

  previous: number;

  next: number;

  hasPreviousPage: boolean;

  hasNextPage: boolean;
}
