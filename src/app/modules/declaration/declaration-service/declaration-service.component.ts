import { AfterViewChecked, Component, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DeclarationService } from '@core/services/declaration/declaration.service';
import { Step, StepDirective } from '@shared/directives/stepper/step.directive';
import { Declaration } from '@shared/models/Declaration.model';
import { Setting } from '@shared/models/Setting.model';
import { SettingsService } from '@shared/services/common/settings.service';
import { NavigationMode, StepperService, StepRoute } from '@shared/services/stepper.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BusinessInformationComponent } from '../containers/business-information/business-information.component';
import { CompanyInformationComponent } from '../containers/company-information/company-information.component';
import { DeclarantComponent } from '../containers/declarant/declarant.component';
import { EquipmentIndictationsComponent } from '../containers/equipment-indictations/equipment-indictations.component';
import { JobCreationAndProductionComponent } from '../containers/job-creation-and-production/job-creation-and-production.component';
import { OrientationComponent } from '../containers/orientation/orientation.component';
import { ProjectAuthorizationsSpecificationsComponent } from '../containers/project-authorizations-specifications/project-authorizations-specifications.component';
import { ProjectCharacteristicsComponent } from '../containers/project-characteristics/project-characteristics.component';
import { ProjectInformationComponent } from '../containers/project-information/project-information.component';
import { RequestedBenefitsComponent } from '../containers/requested-benefits/requested-benefits.component';
import { ValidationIssueMethodComponent } from '../containers/validation-issue-method/validation-issue-method.component';

@Component({
  selector: 'tia-declaration-service',
  templateUrl: './declaration-service.component.html',
  styleUrls: ['./declaration-service.component.scss']
})
export class DeclarationServiceComponent implements OnInit, AfterViewChecked {


  stepRoutes: StepRoute[] = [
    { title: 'Declaration Orientation', component: OrientationComponent },
    { title: 'Information about the declarant', component: DeclarantComponent },
    { title: 'Information about the company to create', component: CompanyInformationComponent },
    { title: 'Project Information', component: ProjectInformationComponent },
    { title: 'Authorizations/Specifications required for the project', component: ProjectAuthorizationsSpecificationsComponent },
    { title: 'Project characteristics & funding scheme', component: ProjectCharacteristicsComponent },
    { title: 'Indications on equipment', component: EquipmentIndictationsComponent },
    { title: 'Job creation & production', component: JobCreationAndProductionComponent },
    { title: 'Requested Benefits', component: RequestedBenefitsComponent },
    { title: 'Validation & method of issuing', component: ValidationIssueMethodComponent },
  ];

  @ViewChildren(StepDirective) steps: QueryList<StepDirective>;

  @ViewChild('container', { read: ViewContainerRef }) container;

  constructor(
    private router: ActivatedRoute,
    private settingsService: SettingsService,
    private stepperService: StepperService,
    private declarationService: DeclarationService
  ) { }

  ngAfterViewChecked() {
    this.stepperService.setSteps = this.steps.toArray();
  }

  ngOnInit() {
    this.stepperService.navigationMode = NavigationMode.FREE;
    this.stepperService.init(this.stepRoutes, this.container);

    this.settingsService.getById(1).subscribe((setting: Setting) => {
      this.router.params.pipe(
        switchMap((params: Params) => {
          if (!isNaN(+params['id']))
            return this.declarationService.getById(+params['id'])
          else
            return Observable.create(obs => obs.next(new Declaration))
        })
      ).subscribe((declaration: Declaration) => {
        if (declaration.project) {
          if (declaration.promotor.type === 1 || declaration.project.type !== 0) {
            this.onCorporateBody(true);
          } else {
            this.onCorporateBody(false);
          }
          if (declaration.project.type !== 0) {
            this.onCompanyInformation(false);
          } else {
            this.onCompanyInformation(true);
          }
          this.stepperService.navigateTo(declaration.currentStep).subscribe({ error(err) { console.log(err) } })
        } else {
          this.stepperService.navigateTo(0).subscribe({ error(err) { console.log(err) } })
        }
      })
      this.settingsService.current = setting;
    })

    this.stepperService.onChange$.subscribe((step: Step) => {
      this.stepperService.navigateTo(step.id).subscribe({ error(err) { console.log(err) } })
    });
  }

  private onCorporateBody(active: boolean = false) {
    const route: StepRoute = { title: 'Business information', component: BusinessInformationComponent };
    if (active) {
      if (!this.stepperService.routes.find(r => r.title == route.title)) {
        this.stepperService.addRoute(route, { position: 1 });
      }
    } else {
      if (this.stepperService.routes.find(r => r.title == route.title)) {
        this.stepperService.removeRoute(route, { position: 1 });
      }
    }
  }
  private onCompanyInformation(active: boolean = true) {
    const route: StepRoute = { title: 'Information about the company to create', component: CompanyInformationComponent }
    if (!active) {
      if (this.stepperService.routes.find(r => r.title == route.title)) {
        this.stepperService.removeRoute(route, { position: 1 });
      }
    } else {
      if (!this.stepperService.routes.find(r => r.title == route.title)) {
        this.stepperService.addRoute(route, { position: 3 });
      }
    }
  }
}



