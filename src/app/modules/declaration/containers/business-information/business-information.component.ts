import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BusinessInformationService } from '@core/services/buisnessInformation/business-information.service';
import { BusinessCompanyInformation } from '@shared/models/BusinessCompanyInformation';
import { StepperService } from '@shared/services/stepper.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'tia-business-information',
  templateUrl: './business-information.component.html',
  styleUrls: ['./business-information.component.scss']
})
export class BusinessInformationComponent implements OnInit {

  businessInformation = new BusinessCompanyInformation();
  isEdit = false;

  constructor(
    private businessInformationService: BusinessInformationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stepperService: StepperService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        const id = +params['id'];
        if (!isNaN(id)) {
          this.businessInformation.declarationId = id;
      this.businessInformationService.GetBusinessInformationByDeclarationId(id).subscribe((businessCompanyInformation: BusinessCompanyInformation) => {

        this.businessInformation = businessCompanyInformation;
        if (businessCompanyInformation.companyId != 0) {
        this.isEdit = true;
        }
      });
      }
    });
  }

  next(businessCompanyInformation: BusinessCompanyInformation) {
    businessCompanyInformation.screenId = this.stepperService.activatedStep.id + 1;
        if (!this.isEdit) {
      this.businessInformationService.insert(businessCompanyInformation)
        .subscribe((businessCompanyInformation: BusinessCompanyInformation) => {
          this.stepperService.refrechSteps();
          this.stepperService.forward();
        });

    } else {
      this.businessInformationService.update(businessCompanyInformation, businessCompanyInformation.companyId)
        .subscribe((businessCompanyInformation: BusinessCompanyInformation) => {
          this.stepperService.refrechSteps();
          this.stepperService.forward();
        }, (error: HttpErrorResponse) => {});
    }
  }
  saveDraft(businessCompanyInformation: BusinessCompanyInformation) {
    businessCompanyInformation.screenId = this.stepperService.activatedStep.id;
    if (!this.isEdit) {
      this.businessInformationService.insert(businessCompanyInformation)
        .subscribe((businessCompanyInformation: BusinessCompanyInformation) => {
          this.stepperService.refrechSteps();
        });
    } else {
      this.businessInformationService.update(businessCompanyInformation, businessCompanyInformation.companyId)
        .subscribe((businessCompanyInformation: BusinessCompanyInformation) => {
          this.stepperService.refrechSteps();
        });
    }
  }
}
