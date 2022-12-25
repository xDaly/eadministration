import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Employee } from '@shared/models/employee.model';
import { BaseService } from '@shared/services/base/base.service';

@Injectable()
export class EmployeeService extends BaseService<Employee> {

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super({ uri: "employment" }, baseUrl, http);
  }

}
