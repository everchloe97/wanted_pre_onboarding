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
import { FilterDto } from './dto/filter-employment.dto';
import { ModifyEmploymentDto } from './dto/modify-employment.dto';
import { CreateCompanyDto } from './dto/create-company.dto';

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
      const result = await this.employmentService.findAllIPosting();
      return DefaultResponse.ok(result, HttpStatus.OK);
    } catch (e) {
      throw new GlobalException(e);
    }
  }

  @ApiOperation({
    summary: '(검색 조건에 맞는) 채용 공고 목록 조회',
  })
  @Get('/searchList')
  async findSome(@Query() filters: FilterDto, ) {
    try {
      const result = await this.employmentService.findSomePosting(filters);
      return DefaultResponse.ok(result, HttpStatus.OK);
    } catch (e) {
      throw new GlobalException(e);
    }
  }

  @ApiOperation({
    summary: '채용공고 상세 조회',
  })
  @Get('/:postingId')
  async findOne(@Param('postingId') postingId: number) {
    try {
      const result = await this.employmentService.findOnePosting(postingId);
      return DefaultResponse.ok(result, HttpStatus.OK);
    } catch (e) {
      throw new GlobalException(e);
    }
  }

  @ApiOperation({
    summary: '회사 정보 등록',
  })
  @Post('/company')
  async createCompany(@Body() createDto: CreateCompanyDto) {
    try {
      const result = await this.employmentService.createCompany(createDto);
      return DefaultResponse.ok(result, HttpStatus.CREATED);
    } catch (e) {
      throw new GlobalException(e);
    }
  }

  @ApiOperation({
    summary: '채용공고 등록',
  })
  @Post('/posting/:companyId')
  async create(@Param('companyId') companyId : number, @Body() createDto: CreateEmploymentDto) {
    try {
      const result = await this.employmentService.createEmployment(companyId, createDto);
      return DefaultResponse.ok(result, HttpStatus.CREATED);
    } catch (e) {
      throw new GlobalException(e);
    }
  }

  @ApiOperation({
    summary: '채용공고 수정',
  })
  @Patch('/:postingId')
  async modifyEmployment(
    @Param('postingId') postingId: number,
    @Body() modifyDto: ModifyEmploymentDto,
  ) {
    try {
      const result = await this.employmentService.modifyEmployment(postingId, modifyDto);
      return DefaultResponse.ok(result, HttpStatus.OK);
    } catch (e) {
      throw new GlobalException(e);
    }
  }


  @ApiOperation({
    summary: '채용 공고 삭제',
  })
  @Delete('/:postingId')
  async deleteOne(@Param('postingId') postingId: number) {
    try {
      const result = await this.employmentService.deletePosting(postingId);
      return DefaultResponse.ok(result, HttpStatus.OK);
    } catch (e) {
      throw new GlobalException(e);
    }
  }

  @ApiOperation({
    summary: '채용공고에 지원',
  })
  @Post('/apply/:postingId')
  async applyOne(@Param('postingId') postingId : number) {
    try {
      const result = await this.employmentService.applyOnePosting(postingId,);
      return DefaultResponse.ok(result, HttpStatus.CREATED);
    } catch (e) {
      throw new GlobalException(e);
    }
  }
}
