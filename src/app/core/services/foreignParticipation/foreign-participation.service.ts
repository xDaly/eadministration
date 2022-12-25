import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ForeignParticipation } from '@shared/models/ForeignParticipation';
import { BaseService } from '@shared/services/base/base.service';

@Injectable()
export class ForeignParticipationService extends BaseService<ForeignParticipation> {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super({ uri: 'PartenerParticipation' }, baseUrl, http);
  }

  GetForeignParticipationByCompanyId(companyId: number) {
    return this.http.get<ForeignParticipation[]>(this.url + `/${companyId}`);
  }
  DeleteForeignParticipationsByDeclarationId(DeclarationId: number) {
    console.log('ooooo');

    return this.http.delete(this.url + '/DeletePartenersParticipations' + `/${DeclarationId}`);
  }
}
