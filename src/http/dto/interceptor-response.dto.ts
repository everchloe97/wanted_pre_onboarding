import { ApiProperty } from '@nestjs/swagger';

/**
 * Dto for the response
 */
export class InterceptorResponseDto<T> {
  @ApiProperty()
  payload: T;
  @ApiProperty({ example: 1617826799860 })
  timestamp: number;
}
