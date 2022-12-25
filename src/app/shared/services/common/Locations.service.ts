import { Injectable, Inject } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Item } from '@shared/models/Orientation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LocationsService extends BaseService<Item>{

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        super({ uri: 'location' }, baseUrl, http);
    }

    getNationalities(){
        return this.http.get<Array<Item>>(`${this.url}/nationalities`);
    }

    search($term): Observable<Array<string>>{
       return this.http.get<Array<string>>(`${this.url}/search?key=${$term}`) 
    }
}