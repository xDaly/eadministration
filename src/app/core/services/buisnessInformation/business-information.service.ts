import { Injectable, Inject } from '@angular/core';
import { BusinessCompanyInformation } from '@shared/models/BusinessCompanyInformation';
import { BaseService } from '@shared/services/base/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BusinessInformationService extends BaseService<BusinessCompanyInformation> {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super({ uri: 'BusinessInformation' }, baseUrl, http);
  }
  GetBusinessInformationByDeclarationId(id: number ){
    return this.http.get<BusinessCompanyInformation>(this.url + `/${id}`);
  }

}
