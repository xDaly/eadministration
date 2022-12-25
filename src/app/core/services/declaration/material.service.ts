import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Material } from '@shared/models/material.model';
import { BaseService } from '@shared/services/base/base.service';

@Injectable()
export class MaterialService extends BaseService<Material> {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super({ uri: "materials" }, baseUrl, http);
  }

}
