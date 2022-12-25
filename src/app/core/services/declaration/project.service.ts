import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Benefit } from '@shared/models/benefit.model';
import { Project } from '@shared/models/project.model';
import { BaseService } from '@shared/services/base/base.service';

@Injectable()
export class ProjectService extends BaseService<Project> {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super({ uri: "project" }, baseUrl, http)
  }

  getTimeTable(project) {
    return this.http.get<any>(`${this.url}/timeTable/${project.id}`);
  }

  updateTimeTable(timeTable, projectId) {
    return this.http.patch<any>(`${this.url}/timeTable/${projectId}`, timeTable);
  }

  projectBenefits(project) {
    return this.http.get<Array<Benefit>>(`${this.url}/benefits/${project.id}`);
  }

  benefitsByField(project) {
    return this.http.get<Array<Benefit>>(`${this.url}/benefitsByField/${project.id}`);
  }

  selectbenefits(Benefits: Array<Benefit>, project: Project) {
    return this.http.post<Array<Benefit>>(`${this.url}/selectBenefits/${project.id}`, Benefits)
  }


}
