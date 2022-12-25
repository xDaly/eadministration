import { Component, OnInit } from '@angular/core';
import { CompanyInformationService } from '@core/services/companyInformation/company-information.service';
import { BusinessCompanyInformation } from '@shared/models/BusinessCompanyInformation';
import { StepperService } from '@shared/services/stepper.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'tia-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.scss']
})
export class CompanyInformationComponent implements OnInit {
  companyInformation = new BusinessCompanyInformation();
  isEdit = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyInformationService: CompanyInformationService,
    private stepperService: StepperService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.companyInformation.declarationId = id;
        this.companyInformationService.getById(id).subscribe((companyInformation: BusinessCompanyInformation) => {
          this.companyInformation = companyInformation;
          this.companyInformation.declarationId = id;
          this.isEdit = true;
        });
      }
    });
  }
  save(companyInformation: BusinessCompanyInformation) {
    companyInformation.screenId = this.stepperService.activatedStep.id + 1;
    if (!this.isEdit) {
      this.companyInformationService.insert(companyInformation).subscribe((companyInformation: BusinessCompanyInformation) => {
        this.stepperService.refrechSteps();
        this.stepperService.forward();
      });
    } else {
      this.companyInformationService.update(companyInformation, companyInformation.declarationId).subscribe((companyInformation: BusinessCompanyInformation) => {
        this.stepperService.refrechSteps();
        this.stepperService.forward();
      });
    }
  }
  saveDraft(companyInformation: BusinessCompanyInformation){
    companyInformation.screenId = this.stepperService.activatedStep.id;
    if (!this.isEdit) {
      this.companyInformationService.insert(companyInformation).subscribe((companyInformation: BusinessCompanyInformation) => {
        this.stepperService.refrechSteps();
      });
    } else {
      this.companyInformationService.update(companyInformation, companyInformation.declarationId).subscribe((companyInformation: BusinessCompanyInformation) => {
        this.stepperService.refrechSteps();
      });
    }
  }

}
