import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class FiltetItemDto {

  @ApiPropertyOptional({ 
    description: '검색어 조건 기본은 position 별 검색  &  검색어 없이 request 시, 전체 목록 조회' , example:'백엔드'})
  search: string;

}
