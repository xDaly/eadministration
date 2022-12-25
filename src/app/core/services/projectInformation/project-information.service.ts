import { Injectable, Inject } from '@angular/core';
import { BaseService } from '@shared/services/base/base.service';
import { HttpClient } from '@angular/common/http';
import { ProjectInformation } from '@shared/models/ProjectInformation';

@Injectable()
export class ProjectInformationService extends BaseService<ProjectInformation> {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super({ uri: 'ProjectInformation' }, baseUrl, http);
  }

}
