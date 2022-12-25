import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Equipement } from '@shared/models/equipment.model';
import { BaseService } from '@shared/services/base/base.service';
import { Observable } from 'rxjs';

@Injectable()
export class EquipmentService extends BaseService<Equipement>{

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    super({ uri: "equipments" }, baseUrl, http)
  }

  /*getbyProject(id: number): Observable<Array<Equipement>> {
    return this.http.get<Array<Equipement>>(this.baseUrl + `/${id}`);
  }*/

}
