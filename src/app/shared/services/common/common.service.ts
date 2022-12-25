import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseModel } from '@shared/models/BaseModel';
import { OperationType } from '@shared/models/Enums/OperationType';
import { Orientation } from '@shared/models/Orientation';
import { SubActivity } from '@shared/models/SubActivity';
import { Association } from './../../models/Association';
import { LegalForm } from './../../models/LegalForm';

@Injectable()
export class CommonService {

  url = 'http://localhost:2159/api/CommonProject/';
  constructor(private http: HttpClient) { }
  GetOperationByType(operationType: OperationType) {
    return this.http.get<BaseModel[]>(this.url + 'getOperationsByType' + `/${operationType}`);
  }

  getProjectTypes() {
    return this.http.get<string[]>(this.url + 'projectTypes');
  }
  getPromotorTypes() {
    return this.http.get<string[]>(this.url + 'promotorType');
  }
  getCountries() {
    return this.http.get<BaseModel[]>(this.url + 'GetNationalities');
  }
  getActivityFields() {
    return this.http.get<BaseModel[]>(this.url + 'activityFields');

  }

  getSectors(id: number) {
    return this.http.get<BaseModel[]>(this.url + 'getSectorsById' + `/${id}`);
  }

  getActivities(id: number) {
    return this.http.get<BaseModel[]>(this.url + 'getActivitiesById' + `/${id}`);
  }

  getSubActivities() {
    return this.http.get<SubActivity[]>(this.url + 'subActivities');

  }
  getSecondaryActivities() {
    return this.http.get<BaseModel[]>(this.url + 'secondaryActivities');
  }
  getLegalForms() {
    return this.http.get<LegalForm[]>(this.url + 'getLegalForms');
  }

  getCounties() {
    return this.http.get<BaseModel[]>(this.url + 'GetCounties');
  }

  getCommunes(id: number) {
    return this.http.get<BaseModel[]>(this.url + 'GetCommunes' + `/${id}`);
  }

  getDelegations(id: number) {
    return this.http.get<BaseModel[]>(this.url + 'GetDelegations' + `/${id}`);
  }

  getAssociations() {
    return this.http.get<Association[]>(this.url + 'GetAssociations');
  }
  getOrientation() {
    return this.http.get<Orientation[]>(this.url + 'Orientation');
  }
  getConfiguration(id: number) {
    return this.http.get<any>(this.url + 'GetSettingById/' + `${id}`);

  }
}
