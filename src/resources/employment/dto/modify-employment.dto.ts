import { ApiPropertyOptional } from '@nestjs/swagger';

export class ModifyEmploymentDto {

  @ApiPropertyOptional({
    example: '백엔드 주니어 개발자_change',
    required:false
  })
  position: string;

  @ApiPropertyOptional({
    example: 2000000,
    required:false
  })
  compensation: number;

  @ApiPropertyOptional({
    example: '원티드랩_change',
    required:false
  })
  content: string;

  @ApiPropertyOptional({
    example: 'Python_change',
    required:false
  })
  tech: string;
}