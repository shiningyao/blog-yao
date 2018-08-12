import {HttpHeaders} from '@angular/common/http';

export interface HttpRequestOptions {
  headers?: HttpHeaders;
  withCredentials?: boolean;
}

export interface FetchOptions {
  method?: string;
  uri?: string;
  includeExtensions?: boolean;
  includeQuery?: boolean;
}

export type Options = {} & FetchOptions & HttpRequestOptions;

export interface Body {
  query?: string;
  variables?: Record<string, any>;
  operationName?: string;
  extensions?: Record<string, any>;
}

export type Context = {} & FetchOptions & HttpRequestOptions;

export interface Request {
  method: string;
  url: string;
  body: Body | Body[];
  options: HttpRequestOptions;
}
