import { Injectable, Inject } from '@angular/core';
import { BusinessCompanyInformation } from '@shared/models/BusinessCompanyInformation';
import { BaseService } from '@shared/services/base/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CompanyInformationService extends BaseService<BusinessCompanyInformation> {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super({ uri: 'CompanyInformation' }, baseUrl, http);
  }
  GetCompanyInformationById(id: number) {
    return this.http.get<BusinessCompanyInformation>(this.url + `${id}`);
  }
  GetInvestmentCost(declarationId: number) {
    return this.http.get<number>(this.url + '/GetInvestmentCost/' + `${declarationId}`);
  }

}
