import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpErrorType } from '../error/http-error-type';
import { ErrorType } from '../error/error-type.enum';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = +exception.getStatus();

    let { errorType, message } = exception.getResponse() as {
      errorType: ErrorType | string;
      message: string | string[];
    };

    const httpErrorFromStatusCode = {};
    Object.keys(HttpErrorType).forEach(key => {
      const value = HttpErrorType[key];
      httpErrorFromStatusCode[value] = key;
    });
    if (!errorType) {
      errorType = httpErrorFromStatusCode[status];
      errorType = errorType || 'UNEXPECTED_ERROR';
    }

    response.status(status).json({
      statusCode: status,
      // errorType,
      message,
      timestamp: new Date().getTime(),
    });
  }
}
