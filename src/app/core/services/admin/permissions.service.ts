import { Inject, Injectable } from "@angular/core";
import { BaseService } from "@shared/services/base/base.service";
import { HttpClient } from "@angular/common/http";
import { Item } from "@shared/models/Orientation";



@Injectable()
export class PermissionsService extends BaseService<Item>{

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        super({ uri: 'permissions' }, baseUrl, http);
    }
}