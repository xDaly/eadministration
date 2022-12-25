import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProjectScheme } from '@shared/models/ProjectScheme.model';
import { BaseService } from '@shared/services/base/base.service';

@Injectable()
export class InvestmentFinancingSchemeService extends BaseService<ProjectScheme>{

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    super({ uri: 'investmentFinance' }, baseUrl, http)
    
  }

  
}

