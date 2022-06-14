import { ApiPropertyOptional } from '@nestjs/swagger';

export class ModifyItemDto {
  @ApiPropertyOptional({
    required: false,
    example: 'title_modify',
  })
  title: string;

  @ApiPropertyOptional({
    required: false,
    example: 'content_modify',
  })
  content: string;
}
