import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpErrorType } from '../error/http-error-type';
import { Logger } from '@nestjs/common';
export class GlobalException extends HttpException {
  constructor(e) {
    if (e.statusCode) {
      super(e, e.statusCode);
    } else {
      const logger = new Logger('GlobalException');

      console.log(e);
      if (e.message) logger.error(e.message, e.stack);

      super(
        {
          // errorType: HttpErrorType[HttpStatus.INTERNAL_SERVER_ERROR],
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: '',
          timestamp: +new Date(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

