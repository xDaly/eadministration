import { BaseService } from "@shared/services/base/base.service";
import { User } from "@shared/models/User.model";
import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UsersService extends BaseService<User>{

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        super({ uri: 'users' }, baseUrl, http);
    }
}