import { EmploymentService } from './employment.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GlobalException } from '../../http/exception.global';
import { DefaultResponse } from '../../http/dto';
import { CreateEmploymentDto } from './dto/create-employment.dto';
import { ModifyItemDto } from './dto/modify-item.dto';
import { FiltetItemDto } from './dto/filter-item.dto';
import { ModifyEmploymentDto } from './dto/update-item.dto';

@ApiTags('Employment')
@Controller('employment')
export class EmploymentController {
  constructor(private readonly employmentService: EmploymentService) {}

  @ApiOperation({
    summary: '채용 공고 목록 조회',
  })
  @Get('/list')
  async findAll() {
    try {
      const result = await this.employmentService.findAllItems();
      return DefaultResponse.ok(result, HttpStatus.OK);
    } catch (e) {
      throw new GlobalException(e);
    }
  }

  @ApiOperation({
    summary: '(검색 조건에 맞는) 채용 공고 목록 조회',
  })
  @Get('/searchList')
  async findOwn(@Query() filters: FiltetItemDto, ) {
    try {
      const result = await this.employmentService.findOwnItems(filters);
      return DefaultResponse.ok(result, HttpStatus.OK);
    } catch (e) {
      throw new GlobalException(e);
    }
  }

  @ApiOperation({
    summary: '채용공고 상세 조회',
  })
  @Get('/:employmentId')
  async findOne(@Param('employmentId') itemId: number) {
    try {
      const result = await this.employmentService.findOneItem(itemId);
      return DefaultResponse.ok(result, HttpStatus.OK);
    } catch (e) {
      throw new GlobalException(e);
    }
  }

  @ApiOperation({
    summary: '채용공고 등록',
  })
  @Post('')
  async create(@Body() createDto: CreateEmploymentDto) {
    try {
      const result = await this.employmentService.createEmployment(createDto);
      return DefaultResponse.ok(result, HttpStatus.CREATED);
    } catch (e) {
      throw new GlobalException(e);
    }
  }

  // @ApiOperation({
  //   summary: ' 수정',
  // })
  // async modifyFile(
  //   @Param('itemId') itemId: number,
  //   @Body() modifyDto: ModifyFileItemDto,
  //   @UploadedFiles() files: File[],
  // ) {
  //   try {
  //     const result = await this.itemService.modifyItemFile(itemId, modifyDto);
  //     return DefaultResponse.ok(result, HttpStatus.OK);
  //   } catch (e) {
  //     throw new GlobalException(e);
  //   }
  // }

  @ApiOperation({
    summary: '채용공고 수정',
  })
  @Patch(':id')
  async modifyEmployment(
    @Param('id') id: number,
    @Body() modifyDto: ModifyEmploymentDto,
  ) {
    try {
      const result = await this.employmentService.modifyEmployment(id, modifyDto);
      return DefaultResponse.ok(result, HttpStatus.OK);
    } catch (e) {
      throw new GlobalException(e);
    }
  }

  

  // @ApiOperation({
  //   summary: '댓글 수정',
  // })
  // @Put('/comment/:commentId')
  // @ApiBearerAuth(TOKEN_NAME)
  // async modifyComment(
  //   @Param('commentId') commentId: number,
  //   @Body() replyDto: ReplyDto,
  // ) {
  //   try {
  //     const result = await this.itemService.modifyComment(commentId, replyDto);
  //     return DefaultResponse.ok(result, HttpStatus.OK);
  //   } catch (e) {
  //     throw new GlobalException(e);
  //   }
  // }

  @ApiOperation({
    summary: '채용 공고 삭제',
  })
  @Delete('/:employmentId')
  async deleteComment(@Param('employmentId') employmentId: number) {
    try {
      const result = await this.employmentService.deleteComment(employmentId);
      return DefaultResponse.ok(result, HttpStatus.OK);
    } catch (e) {
      throw new GlobalException(e);
    }
  }
}
