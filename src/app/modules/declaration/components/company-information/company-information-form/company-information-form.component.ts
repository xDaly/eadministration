import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, SimpleChange } from '@angular/core';
import { ForeignParticipationService } from '@core/services/foreignParticipation/foreign-participation.service';
import { OrientationService } from '@core/services/Orientation/orientation.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BusinessCompanyInformation } from '@shared/models/BusinessCompanyInformation';
import { ForeignParticipation } from '@shared/models/ForeignParticipation';
import { LegalForm } from '@shared/models/LegalForm';
import { CommonService } from '@shared/services/common/common.service';
import { StepperService } from '@shared/services/stepper.service';
import { ToastrService } from 'ngx-toastr';
import { ForeignParticipationComponent } from '../foreign-participation/foreign-participation.component';
import { CompanyInformationService } from '@core/services/companyInformation/company-information.service';
import { DeclarationService } from '@core/services/declaration/declaration.service';


@Component({
  selector: 'tia-company-information-form',
  templateUrl: './company-information-form.component.html',
  styleUrls: ['./company-information-form.component.scss']
})
export class CompanyInformationFormComponent implements OnInit, OnChanges {

  modal: NgbModalRef;

  publicSaving = false;
  HasParticipations = false;
  foreignInvestCeiling: number;
  investmentCost: number;
  authorizedForeignPart: number;
  authorizedOwnPart: number;

  legalForms: Array<LegalForm>;
  foreignParticipations: Array<ForeignParticipation>;

  @Input() companyInformation: BusinessCompanyInformation;

  @Output() next = new EventEmitter();
  @Output() saveDraft = new EventEmitter();

  constructor(
    private commonService: CommonService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private foreignParticipationService: ForeignParticipationService,
    private companyInformationService: CompanyInformationService,
    private stepperService: StepperService,
    private declarationService: DeclarationService) { }

  ngOnInit() {
    this.foreignParticipations = [];
    this.commonService.getConfiguration(1).subscribe(res => {
      this.authorizedForeignPart = res.maxForeignFunds;
      this.authorizedOwnPart = +(1 - this.authorizedForeignPart).toFixed(2);
    });
    this.commonService.getLegalForms().subscribe((LegalForms: Array<LegalForm>) => this.legalForms = LegalForms);
  }

  ngOnChanges(changes: SimpleChanges) {
    const companyInfo: SimpleChange = changes.companyInformation;
    if (companyInfo.currentValue && !companyInfo.firstChange) {
      this.investmentCost = this.companyInformation.investmentCost;
      this.publicSaving = this.companyInformation.publicSavingCalled != null ? true : false;
      this.foreignInvestCeiling = this.investmentCost * this.authorizedForeignPart;
      this.calculateForeignCeiling();
      this.foreignParticipationService.GetForeignParticipationByCompanyId(this.companyInformation.companyId).subscribe((foreignParticipations: Array<ForeignParticipation>) => {
        this.foreignParticipations = foreignParticipations;
        if (this.foreignParticipations.length !== 0) {
          this.HasParticipations = true;
        }
      });
    }
  }

  create() {
    const foreignConfig = {
      foreignInvestCeiling: this.foreignInvestCeiling,
      total: this.companyInformation.foreignEquityAmount,
      declarationId: this.companyInformation.declarationId
    };
    this.modal = this.modalService.open(ForeignParticipationComponent, { centered: true });
    this.modal.componentInstance.foreignConfig = foreignConfig;
    this.modal.result.then((participation: ForeignParticipation) => {
      this.foreignParticipationService.insert(participation).subscribe((participation: ForeignParticipation) => {
        this.foreignParticipations.push(participation);
        this.HasParticipations = true;
        this.foreignInvestCeiling = this.calculateForeignCeiling();
      });
    }, reason => {});
  }

  update(foreignParticipation) {
    if (foreignParticipation.action === 'clear') {
      this.foreignParticipationService.DeleteForeignParticipationsByDeclarationId(this.companyInformation.declarationId).subscribe(res => {
        this.foreignParticipations = [];
        this.HasParticipations = false;
        return; }, err => {return;
      });
    } else {
    const foreignParticipationIndex = this.foreignParticipations.findIndex((participation: ForeignParticipation) => participation === foreignParticipation.value);
    if (foreignParticipation.action === 'delete') {
      this.foreignParticipationService.delete(foreignParticipation.value.id).subscribe(_ => {
        this.foreignParticipations.splice(foreignParticipationIndex, 1);
        if (this.foreignParticipations.length === 0) {
          this.HasParticipations = false;
        }
        this.foreignInvestCeiling = this.calculateForeignCeiling();
        this.declarationService.UpdateDeclarationStep(this.companyInformation.declarationId, this.stepperService.activatedStep.id);
      });
    } else {
      this.foreignInvestCeiling = this.foreignInvestCeiling + foreignParticipation.value.participationAmount;
      this.modal = this.modalService.open(ForeignParticipationComponent, { centered: true });
      this.modal.componentInstance.foreignConfig = {
        foreignPart: foreignParticipation.value,
        foreignInvestCeiling: this.foreignInvestCeiling,
        total: this.companyInformation.foreignEquityAmount
      };
      this.modal.result.then((participation: ForeignParticipation) => {
        this.foreignParticipationService.update(participation, participation.id).subscribe((res: ForeignParticipation) => {
          this.HasParticipations = true;
          this.foreignParticipations[foreignParticipationIndex] = res;
          this.foreignInvestCeiling = this.calculateForeignCeiling();
        });
      }, reason => {});
    }
  }
  }

  calculateForeignCeiling() {
    if (this.foreignParticipations.length !== 0) {
      const foreignParticipationsAmount = this.foreignParticipations.map(amount => amount.participationAmount).reduce((prev, curr) => prev + curr);
      return (this.companyInformation.foreignEquityAmount) - foreignParticipationsAmount;
    } else {
      return this.companyInformation.foreignEquityAmount;
    }
  }

  calculateForeignRate() {
    this.companyInformation.foreignEquityRate = +(this.companyInformation.foreignEquityAmount * 100 / this.investmentCost).toFixed(2);
    if (this.companyInformation.foreignEquityAmount > this.investmentCost * this.authorizedForeignPart) {
      this.toastr.info('The foreign equity share must be less or equal than 70% of the total investment', 'invalid capital share ');
    } else {
      this.foreignInvestCeiling = this.companyInformation.foreignEquityAmount;
    }
  }
  verifyShareCapital() {
    if (this.companyInformation.shareCapital < this.investmentCost * this.authorizedOwnPart) {
      this.toastr.info('The share capital must be greater than or equal to 30% of the total investment', 'invalid capital share ');
      return false;
    } else  {
      this.calculateForeignRate();
      return true;
    }
    // to do
    if (this.companyInformation.legalFormId === 3) {
      if (this.companyInformation.publicSavingCalled && this.companyInformation.shareCapital) {
      }
    }
  }
  verifyForeignEquity() {
    if ( this.companyInformation.foreignEquityAmount == 0 || this.companyInformation.foreignEquityAmount > this.investmentCost * this.authorizedForeignPart ) {
      return true;
    }
    if (!(this.foreignInvestCeiling > 0)) {
      return true;
    }
    return false;
  }
  verifyLegalForm() {
    const legalFormDescription = this.legalForms.find((legalForm: LegalForm) => legalForm.id === this.companyInformation.legalFormId);
    if (legalFormDescription.description) {
      this.toastr.info(legalFormDescription.description, 'legal form description information');
    }
    if (this.companyInformation.legalFormId === 3) {
      this.publicSaving = true;
    } else {
      this.publicSaving = false;
      this.companyInformation.publicSavingCalled = null;
    }
  }

  CheckParticipations() {
    if (this.foreignParticipations.length === 0) {
      return false;
    }
    const participationsAmount = this.foreignParticipations.map(amount => amount.participationAmount).reduce((prev, curr) => prev + curr);
    if (this.companyInformation.foreignEquityAmount != participationsAmount) {
      this.toastr.info('the participtions amount and the foreign equity amount dont match  ', 'legal form description information');

      return false;
    }
    return true;
  }

  save() {
    if ( this.verifyShareCapital() && !this.verifyForeignEquity() &&  this.CheckParticipations()) {
      this.next.emit(this.companyInformation);
    }
  }
  SaveDraft() {
    this.saveDraft.emit(this.companyInformation);
  }

}
