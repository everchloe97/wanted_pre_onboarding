import { Company } from '../entities/company.entity';

export class ResponseEmploymentDto {
  // static Create(company: Company) {

  //   const response = {
  //     id: company.id,
  //     companyId : company.companyId,
  //     position : company.position,
  //     compensation : company.compensation,
  //     content : company.content,
  //     tech : company.tech,
  //   };

  //   return response;
  //}
  static Response(company: Company) {
    const response = {
      id: company.id,
    //  companyId : company.companyId,
      position : company.position,
      compensation : company.compensation,
      content : company.content,
      tech : company.tech,
    };

    return response;
  }
}
