import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Benefit } from '@shared/models/benefit.model';
import { Project } from '@shared/models/project.model';
import { BaseService } from '@shared/services/base/base.service';

@Injectable()
export class RequestedBenefitsService extends BaseService<Benefit> {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super({ uri: "benefits" }, baseUrl, http);
  }

}
