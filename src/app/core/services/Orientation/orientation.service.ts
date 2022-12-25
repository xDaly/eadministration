import { Injectable, Inject } from '@angular/core';
import { BaseService } from '@shared/services/base/base.service';
import { Orientation } from '@shared/models/Orientation';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class OrientationService extends BaseService<Orientation> {


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super({ uri: 'orientation' }, baseUrl, http);
  }

}
