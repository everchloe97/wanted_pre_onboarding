import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { ResponseEmploymentDto } from './dto/response-item.dto';
import { ErrorResponse } from '../../http/dto/error-response.dto';
import { ErrorType } from '../../error/error-type.enum';
import { FiltetItemDto } from './dto/filter-item.dto';
import { Company } from './entities/company.entity';
import { CreateEmploymentDto } from './dto/create-employment.dto';


@Injectable()
export class EmploymentService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>
  ) {}

async modifyEmployment(id, modifyDto) {
  // 수정
}


// 5. 채용공고 상세 목록을 가져옵니다. (작업 중)
  async findOneItem(employmentId: number) {
    const itemRepo = await this.companyRepository.findOne({
      where: { id: employmentId },
    });
    if (!itemRepo) throw ErrorResponse.error(ErrorType.NOT_FOUND);
    else {
     const result = ResponseEmploymentDto.Response(itemRepo);
      return result;
    }
  }

    // 4. 채용공고 목록을 가져옵니다. (4-1)
    async findAllItems() {
      const result = await this.companyRepository.find();
      return result;
    }

  // 4. 채용공고 목록을 가져옵니다. (4-2)
  async findOwnItems(filters: FiltetItemDto) {
    const keyword = filters.search || ' ';
    const result = await this.companyRepository.find({
      where: { position: Like('%' + keyword + '%') },
    });
    return result;
  }

// 1. 채용공고를 등록합니다.
  async createEmployment (createDto: CreateEmploymentDto) {

    const employment= new Company();

    //employment.companyId = createDto.companyId;
    employment.content = createDto.content;
    employment.compensation = createDto.compensation;
    employment.position = createDto.position;
    employment.tech = createDto.tech;

    await this.companyRepository.save(employment);

    const employmentResult = ResponseEmploymentDto.Response(employment);
    return employmentResult;
  }

// 3. 채용공고를 삭제합니다.
  async deleteComment(employmentId: number) {
    const ExistComment = await this.companyRepository.findOneBy({ id:employmentId });
    if (!ExistComment) throw ErrorResponse.error(ErrorType.NOT_FOUND);
    else {
        await this.companyRepository.delete(employmentId);
      } 
    }
}
