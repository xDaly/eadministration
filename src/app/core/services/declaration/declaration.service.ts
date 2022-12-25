import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Declaration } from '@shared/models/Declaration.model';
import { BaseService } from '@shared/services/base/base.service';

@Injectable()
export class DeclarationService extends BaseService<Declaration> {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super({ uri: 'declaration' }, baseUrl, http);
  }

  GetByCase(status) {
    return this.http.get<Array<Declaration>>(`${this.url}?case=${status}`);
  }

  UpdateDeclarationStep(declarationId: number, screenId: number) {
    return this.http.patch(this.url + `/updateStepId/${declarationId}/${screenId}`,{});
  }



}
