import { Component, OnInit } from '@angular/core';
import { ProjectType } from '@shared/models/Enums/ProjectType';
import { PromotorType } from '@shared/models/Enums/PromotorType';
import { ProjectScheme } from '@shared/models/ProjectScheme.model';

@Component({
  selector: 'tia-project-characteristics-form',
  templateUrl: './project-characteristics-form.component.html',
  styleUrls: ['./project-characteristics-form.component.scss']
})
export class ProjectCharacteristicsFormComponent implements OnInit {

  scheme: ProjectScheme;

  capitalTitle = '';

  constructor() { }

  ngOnInit() {
    if (this.scheme.projectType !== ProjectType.Declaration) {
      switch (this.scheme.promotorType) {
        case PromotorType.NaturalPerson: this.capitalTitle = 'Capital Increase'; break;
        case PromotorType.CorporateBody: this.capitalTitle = 'OwnFunds (Extention)'; break;
      }
    } else {
      this.capitalTitle = 'Share Capital'
    }
  }

  get investmentTotal(): number {
    return (
      this.scheme.investmentFinance.terrain
      + this.scheme.investmentFinance.constractions
      + this.scheme.investmentFinance.planning
      + this.scheme.investmentFinance.incorporateCost
      + this.scheme.investmentFinance.importedEquipment
      + this.scheme.investmentFinance.localEquipment
      + this.scheme.investmentFinance.plantation
      + this.scheme.investmentFinance.cattle
      + this.scheme.investmentFinance.workingCapital
      + this.scheme.investmentFinance.meansOfTransport
      + this.scheme.investmentFinance.studyCost
      + this.scheme.investmentFinance.otherExpenses
    )
  }

  get financeTotal(): number {
    return (
      this.scheme.investmentFinance.longTermCredit
      + this.scheme.investmentFinance.mediumTermCredit
      + this.scheme.investmentFinance.shortTermCredit
      + this.scheme.investmentFinance.leasing
      + this.scheme.investmentFinance.supplierCredit
      + this.scheme.investmentFinance.landCredit
      + this.scheme.investmentFinance.foreingCredit
      + this.scheme.investmentFinance.otherResources
    )
  }

  get GraterShareCapital(): boolean {
    return this.investmentTotal < this.scheme.capital
  }

  get InvestmentEqualFinance(): boolean {
    return this.investmentTotal === this.financeTotal
  }

}


