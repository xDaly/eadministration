import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Declarant } from '@shared/models/Declarant';
import { BaseService } from '@shared/services/base/base.service';

@Injectable()
export class DeclarantService extends BaseService<Declarant> {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super({ uri: 'Declarent' }, baseUrl, http);
  }
  // GetDeclarentByDeclarationId(declarationId: number) {
  //   return this.http.get<Declarant>(this.url + '/')
  // }


}
