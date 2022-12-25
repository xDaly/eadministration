import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Production, ProductionType } from '@shared/models/production.model';
import { BaseService } from '@shared/services/base/base.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductionService extends BaseService<Production> {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super({ uri: "production" }, baseUrl, http);
  }

  GetProductions(projectId: number, type): Observable<Array<Production>> {
    return this.http.get<Array<Production>>(`${this.url}?project=${projectId}&type=${type}`);
  }
}
