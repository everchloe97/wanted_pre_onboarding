import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const SKIP_AUTH = 'skipAuth';
export const TOKEN_NAME = 'Authorization';
export const AUTH_OPTIONS: SecuritySchemeObject = {
  name : "Authorization",
  type : "http",
  scheme: 'bearer',
  bearerFormat: 'Bearer',
  in: 'header',
},
security = 'auth: []'
;

export enum USER_ROLE {
  USER = 'user',
  ADMIN = 'admin'
}