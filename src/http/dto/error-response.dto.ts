import { HttpErrorType } from 'src/error/http-error-type';
import { ExceptionFilter, UseFilters } from '@nestjs/common';
import { ErrorType } from 'src/error/error-type.enum';
import { HttpExceptionFilter } from '../http-exception.filter';

@UseFilters(new HttpExceptionFilter())
export class ErrorResponse implements ExceptionFilter {
  catch(errorType: any) {
    throw new Error('Method not implemented.');
  }
  statusCode: number;
  message: string;
  timestamp: number;

  public static error(errorType: ErrorType) {
    const response = new ErrorResponse();

    response.statusCode = HttpErrorType[errorType] || 400;
    response.message = errorType ?? 'UNEXPECTED_ERROR';
    response.timestamp = new Date().getTime();

    return response;
  }
}
