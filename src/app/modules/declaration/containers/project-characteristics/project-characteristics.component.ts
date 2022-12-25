import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DeclarationService } from '@core/services/declaration/declaration.service';
import { InvestmentFinancingSchemeService } from '@core/services/declaration/investment-financing-scheme.service';
import { ProjectCharacteristicsAgricultureFormComponent } from '@modules/declaration/components/project-characteristics/project-characteristics-agriculture-form/project-characteristics-agriculture-form.component';
import { ProjectCharacteristicsFormComponent } from '@modules/declaration/components/project-characteristics/project-characteristics-form/project-characteristics-form.component';
import { Declaration } from '@shared/models/Declaration.model';
import { ProjectScheme, InvestmentFinance } from '@shared/models/ProjectScheme.model';
import { StepperService } from '@shared/services/stepper.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'tia-project-characteristics',
  templateUrl: './project-characteristics.component.html',
  styleUrls: ['./project-characteristics.component.scss']
})
export class ProjectCharacteristicsComponent implements OnInit {

  @ViewChild('form', { read: ViewContainerRef }) form: ViewContainerRef;

  declaration: Declaration;

  scheme: ProjectScheme;
  formComponent: ComponentRef<any>;

  validation = {
    isValidInvestement: false,
    isValidInvestementFinancing: false
  };

  constructor(
    private route: ActivatedRoute,
    private resolver: ComponentFactoryResolver,
    private toastrService: ToastrService,
    private stepperService: StepperService,
    private declarationService: DeclarationService,
    private investmentFinanceService: InvestmentFinancingSchemeService,
  ) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.declarationService.getById(+params['id'])
        .subscribe((declaration: Declaration) => {
          this.investmentFinanceService.getById(declaration.project.id)
            .subscribe((scheme: ProjectScheme) => this.rendredFrom(scheme.activityField, scheme))
          this.declaration = declaration;
        })
    })
  } 

  rendredFrom(field: number, scheme: ProjectScheme) {
    let factory: ComponentFactory<any>;
    field !== environment.activityField.Agriculture
      ? factory = this.resolver.resolveComponentFactory(ProjectCharacteristicsFormComponent)
      : factory = this.resolver.resolveComponentFactory(ProjectCharacteristicsAgricultureFormComponent)

    this.form.clear();
    this.formComponent = this.form.createComponent(factory);
    this.formComponent.instance.scheme = scheme;
  }

  next() {
    debugger
    if (this.formComponent.instance.GraterShareCapital) {
      this.toastrService.error(`The total amount of the fields in the Investments section (TND) must be equal to the Investment cost. (${this.formComponent.instance.scheme.capital} TND.)`)
      return;
    }

    if (!this.formComponent.instance.InvestmentEqualFinance) {
      this.toastrService.error("The total investment must equal the total financing.")
      return;
    }

    this.declaration.currentStep = this.stepperService.activatedStep.id + 1;

    this.investmentFinanceService.update(this.formComponent.instance.scheme, this.formComponent.instance.scheme.investmentFinance.id)
      .subscribe((result: ProjectScheme) => this.scheme = result)

    this.declarationService.update(this.declaration, this.declaration.id).subscribe((declaration: Declaration) => this.declaration = declaration);

    this.stepperService.forward();
  }
  SaveDraft() {
    this.declaration.currentStep = this.stepperService.activatedStep.id;
    this.investmentFinanceService.update(this.formComponent.instance.scheme, this.formComponent.instance.scheme.investmentFinance.id)
      .subscribe((result: ProjectScheme) => this.scheme = result);
    this.declarationService.update(this.declaration, this.declaration.id).subscribe((declaration: Declaration) => this.declaration = declaration);

  }

  calculateTotal(formGroup) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return (Object.values(formGroup).reduce(reducer) as number);
  }
}
