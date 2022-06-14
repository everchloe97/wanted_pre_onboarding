import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmploymentDto {

  @ApiPropertyOptional({
    example: '백엔드 주니어 개발자',
  })
  position: string;

  @ApiPropertyOptional({
    example: 1000000,
  })
  compensation: number;

  @ApiPropertyOptional({
    example: '원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..',
  })
  content: string;

  @ApiPropertyOptional({
    example: 'Python',
  })
  tech: string;
}
