import { Application } from '../entities/application.entity';
import { Company } from '../entities/company.entity';

export class ResponseEmploymentDto {

  companyId:number;
  companyName:string;
  region :string;
  country :string;
  position : string;
  compensation : number;
  tech : string;
  content : string;


  static PostingResponse(posting: Application) {

    const response = {
      companyId : posting.companyId,
      position : posting.position,
      compensation : posting.compensation,
      content : posting.content,
      tech : posting.tech,
    };

    return response;
  }
  static Response(company: Company) {
    const response = {
      id: company.id,
      name : company.name,
      region : company.region,
      country : company.country,
    };

    return response;

  }
  static DetailResponse(any) {
    const response = {
    
     
    };

    return response;
  }
}
