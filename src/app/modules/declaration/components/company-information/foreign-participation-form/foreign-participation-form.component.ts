import { BaseModel } from '@shared/models/BaseModel';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ForeignParticipation } from '@shared/models/ForeignParticipation';
import { CommonService } from '@shared/services/common/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'tia-foreign-participation-form',
  templateUrl: './foreign-participation-form.component.html',
  styleUrls: ['./foreign-participation-form.component.scss']
})
export class ForeignParticipationFormComponent implements OnInit {
  @Input() foreignConfig: any;
  foreignParticipation: ForeignParticipation;
  countries: BaseModel[] = [];
  @Output() foreignParticipationOutput = new EventEmitter();
  isValidForeignParticipation = false;

  constructor(private commonService: CommonService, private toastr: ToastrService) { }

  ngOnInit() {
    if (!this.foreignConfig.foreignPart) {
      this.foreignParticipation = new ForeignParticipation();
      this.foreignParticipation.declarationId = this.foreignConfig.declarationId;
    } else {
      this.foreignParticipation = Object.assign({}, this.foreignConfig.foreignPart);
      this.isValidForeignParticipation = true;
    }
    this.commonService.getCountries().subscribe(res => {
      this.countries = res;
    });
  }
  submit() {
    this.foreignParticipationOutput.emit(this.foreignParticipation);
  }
  calculate() {
    if (this.foreignParticipation.participationAmount > this.foreignConfig.foreignInvestCeiling) {

      this.toastr.error('the participation amount is greater than the auhtorized foreign participation amount', 'invalid participation amount');
      this.isValidForeignParticipation = false;
    } else {

      this.foreignParticipation.participationRate = parseFloat((this.foreignParticipation.participationAmount * 100 / this.foreignConfig.total).toFixed(2));
      this.isValidForeignParticipation = true;
    }
  }
  compareById(n1,n2) {
    if (n1 == null || n2 == null) {
      return false;
    }
    return n1.id == n2.id;
  }

}
