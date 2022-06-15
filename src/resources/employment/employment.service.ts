import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { ResponseEmploymentDto } from './dto/response-employment.dto';
import { ErrorResponse } from '../../http/dto/error-response.dto';
import { ErrorType } from '../../error/error-type.enum';
import { FilterDto } from './dto/filter-employment.dto';
import { Company } from './entities/company.entity';
import { CreateEmploymentDto } from './dto/create-employment.dto';
import { ModifyEmploymentDto } from './dto/modify-employment.dto';
import { Application } from './entities/application.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from './entities/user.entity';

@Injectable()
export class EmploymentService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 0. 회사 정보를 등록합니다.
  async createCompany(createDto: CreateCompanyDto) {
    const company = new Company();

    company.name = createDto.name;
    company.region = createDto.region;
    company.country = createDto.country;

    await this.companyRepository.save(company);

    const result = ResponseEmploymentDto.Response(company);
    return result;
  }

  // 1. 채용공고를 등록합니다.
  async createEmployment(companyId: number, createDto: CreateEmploymentDto) {
    const posting = new Application();

    posting.companyId = companyId;
    posting.content = createDto.content;
    posting.compensation = createDto.compensation;
    posting.position = createDto.position;
    posting.tech = createDto.tech;

    await this.applicationRepository.save(posting);

    const result = ResponseEmploymentDto.PostingResponse(posting);
    return result;
  }

  // 2. 채용공고를 수정합니다.
  async modifyEmployment(postingId: number, modifyDto: ModifyEmploymentDto) {
    const existPosting = await this.applicationRepository.findOneBy({ id: postingId });
    if (existPosting) {
      await this.applicationRepository.update({ id: postingId }, modifyDto);
     const modifiendResult = await this.applicationRepository.findOneBy({id:postingId})
     const result=  ResponseEmploymentDto.PostingResponse( modifiendResult)
      return result;
    } else throw ErrorResponse.error(ErrorType.NOT_FOUND);
  }

  // 3. 채용공고를 삭제합니다.
  async deletePosting(postingId: number) {
    const existPosting = await this.applicationRepository.findOneBy({ id: postingId });
    if (!existPosting) throw ErrorResponse.error(ErrorType.NOT_FOUND);
    else {
      await this.applicationRepository.delete(postingId);
    }
  }

  // 4. 채용공고 목록을 가져옵니다. (4-1)
  async findAllIPosting() {
    const result = await this.applicationRepository.find({
      relations: ['company','company.application'],
    });

    const resultDataList = [];
    for (const item of result) {
    const responseDto = new ResponseEmploymentDto();

    responseDto.companyId = item.companyId;
    responseDto.companyName = item.position;
    responseDto.compensation = item.compensation;
    responseDto.position = item.position;
    //responseDto.content = item.content;
    responseDto.tech = item.tech;
    
    responseDto.companyName = item.company.name
    responseDto.country =  item.company.country
    responseDto.region = item.company.region
    resultDataList.push(responseDto)
    }
    return resultDataList
} 

  // 4. 채용공고 목록을 가져옵니다. (4-2)
  async findSomePosting(filters: FilterDto) {
    const keyword = filters.search || ' ';
    const result = await this.applicationRepository.find({
      where: { position: Like('%' + keyword + '%') },
      relations: ['company'],
    });

    const resultDataList = [];
    for (const item of result) {
    const responseDto = new ResponseEmploymentDto();

    responseDto.companyId = item.companyId;
    responseDto.companyName = item.position;
    responseDto.compensation = item.compensation;
    responseDto.position = item.position;
    //responseDto.content = item.content;
    responseDto.tech = item.tech;
    
    responseDto.companyName = item.company.name
    responseDto.country =  item.company.country
    responseDto.region = item.company.region
    resultDataList.push(responseDto)
    }
    return resultDataList
  }

  // 5. 채용 상세 페이지를 가져옵니다.
  async findOnePosting(postingId: number) {
    const result = await this.applicationRepository.find({
      where: {
        id: postingId,
      },
      relations: ['company', 'company.application'],
    });
    if (!result) throw ErrorResponse.error(ErrorType.NOT_FOUND);
    else {
      const resultDataList = [];
      for (const item of result) {
      const responseDto = new ResponseEmploymentDto();
  
      responseDto.companyId = item.companyId;
      responseDto.companyName = item.position;
      responseDto.compensation = item.compensation;
      responseDto.position = item.position;
      responseDto.content = item.content;
      responseDto.tech = item.tech;
      
      responseDto.companyName = item.company.name
      responseDto.country =  item.company.country
      responseDto.region = item.company.region
      resultDataList.push(responseDto)
      }
      return resultDataList
    }
  }

  // 6. 사용자는 채용공고에 지원합니다.
  async applyOnePosting(postingId: number) {
    const applyUser = new User();
    const applyApplication = new Application();

    applyApplication.user = applyUser
    
     const user = await this.userRepository.save(applyUser);
     await this.applicationRepository.update({id:postingId},applyApplication)

    const result = {userId: user.id, postingId:postingId}
    return result;
  }
}
