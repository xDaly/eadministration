import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Item } from '@shared/models/Orientation';
import { Observable } from 'rxjs';

@Injectable()
export class ActivitiesService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getFields(): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(this.baseUrl + `api/activities`);
  }

  getSectorByActivityField(id: number): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(this.baseUrl + `api/activities/sectors?id=${id}`);
  }

  getActivitiesBySector(id: number): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(this.baseUrl + `api/activities/activities?id=${id}`)
  }

  getSubActivitiesByActivity(id: number): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(this.baseUrl + `api/activities/subActivities?id=${id}`);
  }

  getSecondaryActivities() {
    return this.http.get<Array<Item>>(this.baseUrl + 'api/activities/SecondaryActivities')
  }
}
