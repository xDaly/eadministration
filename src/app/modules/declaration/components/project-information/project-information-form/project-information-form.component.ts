import { environment } from './../../../../../../environments/environment.prod';
import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { CommonService } from '@shared/services/common/common.service';
import { ProjectInformation } from '@shared/models/ProjectInformation';
import { BaseModel } from '@shared/models/BaseModel';
import { StepperService } from '@shared/services/stepper.service';
import { Orientation } from '@shared/models/Orientation';
import { OperationType } from '@shared/models/Enums/OperationType';

@Component({
  selector: 'tia-project-information-form',
  templateUrl: './project-information-form.component.html',
  styleUrls: ['./project-information-form.component.scss']
})
export class ProjectInformationFormComponent implements OnInit, OnChanges {
  @Input() projectInformation: ProjectInformation;
  counties: BaseModel[];
  delegations: BaseModel[];
  communes: BaseModel[];
  firstOperationNatures: BaseModel[];
  secondOperationNatures: BaseModel[];
  isAgriculture = false ;
  selectedSector: BaseModel;
  selectedActivity: BaseModel;
  @Output() next = new EventEmitter();
  @Output() saveDraft = new EventEmitter();
  constructor(private commonService: CommonService, private  stepperService: StepperService) { }

  ngOnInit() {
    this.commonService.getCounties().subscribe((res) => {
      this.counties = res;
    }, (error) => {
    });
  }
  ngOnChanges() {
    if (this.projectInformation) {
      this.selectedSector = this.projectInformation.selectedSector;
      this.selectedActivity = this.projectInformation.selectedActivity;
      if (this.projectInformation.countyId) {
        this.commonService.getDelegations(this.projectInformation.countyId).subscribe((res) => {
          this.delegations = res; });
      }
      if (this.projectInformation.delegationId) {
        this.commonService.getCommunes(this.projectInformation.delegationId).subscribe((res) => {
          this.communes = res; });
      }
      this.isAgriculture = this.projectInformation.activityFieldId === environment.activityField.Agriculture ? true : false;
      if (this.isAgriculture) {
        this.commonService.GetOperationByType(OperationType.Primary).subscribe(res => {
          this.firstOperationNatures = res;
        });
        this.commonService.GetOperationByType(OperationType.Secondary).subscribe(res => {
          this.secondOperationNatures = res;
        });
      }
    }
  }
  getDelegations() {
    this.commonService.getDelegations(this.projectInformation.countyId).subscribe((res) => {
    this.delegations = res;
    this.communes = [];
    this.projectInformation.delegationId = null;
    this.projectInformation.communeId = null;
    });
  }
  getCommunes() {
    this.commonService.getCommunes(this.projectInformation.delegationId).subscribe((res) => {
      this.communes = res;
      this.projectInformation.communeId = null;
    });
  }

  save() {
    this.next.emit(this.projectInformation);
  }
  SaveDraft(){
    this.saveDraft.emit(this.projectInformation)
  }

}
