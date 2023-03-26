import { Request } from 'express';

export interface IRequestApp extends Request {
  id: string;
  timestamp: number;
  customLang: string[];
  version: string;
  repoVersion: string;
  // userAgent: IResult;

  user?: Record<string, any>;
  __class?: string;
  __function?: string;
}
