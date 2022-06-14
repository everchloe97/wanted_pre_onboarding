import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyDto {

  @ApiPropertyOptional({
    example: '원티드랩',
  })
  name: string;

  @ApiPropertyOptional({
    example: '서울',
  })
  region: string;

  @ApiPropertyOptional({
    example: '한국',
  })
  country: string;

}
