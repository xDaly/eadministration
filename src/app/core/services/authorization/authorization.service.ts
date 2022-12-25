import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@shared/services/base/base.service';
import { Authorization } from '@shared/models/Authorization';

@Injectable()
export class AuthorizationService extends BaseService<Authorization>{

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super({ uri: 'Authorization' }, baseUrl, http);
  }
  GetAuthorizationsByDeclarationId(id: number) {
    return this.http.get<Authorization[]>(this.url + '/GetAuthorizations' + `/${id}`);
  }
}
