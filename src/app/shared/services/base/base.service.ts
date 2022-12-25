import { catchError } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  model: T;
  uriPrefix: string;
  uri: string;
  url: string;

  constructor(options: {
    model?: T,
    uriPrefix?: string,
    uri?: string;
    url?: string;
  } = {},
    @Inject("BASE_URL") public baseUrl: string,
    public http: HttpClient
  ) {
    this.model = options.model;
    this.uriPrefix = options.uriPrefix || "api";
    this.uri = options.uri;
    this.url = this.baseUrl + this.uriPrefix + "/" + this.uri;
  }

  getAll() {
    return this.http.get<Array<T>>(this.url);
  }

  getById(id): Observable<T> {
    return this.http.get<T>(this.url + `/${id}`);
  }

  insertList(list: Array<T>) {
    return this.http.post<Array<T>>(this.url, list);
  }


  insert(enitiyToCreate: T) {
    return this.http.post<T>(this.url, enitiyToCreate);
  }

  update(enitiyToUpdate: T, id) {
    return this.http.patch<T>(this.url + `/${id}`, enitiyToUpdate);
  }

  delete(id) {
    return this.http.delete<T>(this.url + `/${id}`);
  }

  filterBy(query: { name: string, value: any }) {
    return this.http.get<any>(this.url + `?${query.name}=${query.value}`)
  }

}

