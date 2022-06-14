import { ApiProperty } from '@nestjs/swagger';

export class DefaultResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;
  
  // @ApiProperty({ example: '' })
  // message: string;

  @ApiProperty({ example: null })
  data: any;

  public static ok(data: any, statusCode?: number) {
    const response = new DefaultResponse();
    response.data = data;
    // response.message = message;
    response.statusCode = statusCode || 200;

    return response;
  }
}
