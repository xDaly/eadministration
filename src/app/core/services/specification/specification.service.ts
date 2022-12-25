import { Injectable, Inject } from '@angular/core';
import { BaseService } from '@shared/services/base/base.service';
import { Specification } from '@shared/models/Specification';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SpecificationService extends BaseService<Specification> {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super({ uri: 'Specification' }, baseUrl, http);
  }
  GetSpecificationsByDeclarationId(id: number) {
    return this.http.get<Specification[]>(this.url + '/GetSpecifications' + `/${id}`);
  }
}
