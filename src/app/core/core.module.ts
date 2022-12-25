import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from 'app/app-routing.module';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { AuthGuardService } from './guards/auth.guard';
import { httpInterceptorProviders } from './helpers';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PermissionsService } from './services/admin/permissions.service';
import { UsersService } from './services/admin/users.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthorizationService } from './services/authorization/authorization.service';
import { BusinessInformationService } from './services/buisnessInformation/business-information.service';
import { CompanyInformationService } from './services/companyInformation/company-information.service';
import { DeclarantService } from './services/Declarant/declarant.service';
import { DeclarationService } from './services/declaration/declaration.service';
import { EmployeeService } from './services/declaration/employee.service';
import { EquipmentService } from './services/declaration/equipment.service';
import { InvestmentFinancingSchemeService } from './services/declaration/investment-financing-scheme.service';
import { MaterialService } from './services/declaration/material.service';
import { ProductionService } from './services/declaration/production.service';
import { ProjectService } from './services/declaration/project.service';
import { RequestedBenefitsService } from './services/declaration/requested-benefits.service';
import { FileUploadService } from './services/fileUpload/file-upload.service';
import { ForeignParticipationService } from './services/foreignParticipation/foreign-participation.service';
import { OrientationService } from './services/Orientation/orientation.service';
import { ProjectInformationService } from './services/projectInformation/project-information.service';
import { SpecificationService } from './services/specification/specification.service';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    SharedModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgBootstrapFormValidationModule.forRoot(),
    AppRoutingModule,
  ],
  declarations: [
    LoginComponent,
    NotfoundComponent
  ],
  exports: [
    LoginComponent,
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    DeclarantService,
    OrientationService,
    BusinessInformationService,
    CompanyInformationService,
    ProjectInformationService,
    DeclarationService,
    FileUploadService,
    SpecificationService,
    AuthorizationService,
    ForeignParticipationService,
    DeclarationService,
    ProjectService,
    RequestedBenefitsService,
    EquipmentService,
    EmployeeService,
    ProductionService,
    MaterialService,
    ProjectService,
    InvestmentFinancingSchemeService,
    ProjectService,
    UsersService,
    PermissionsService
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule)
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: 'Window', useValue: window
        },
        httpInterceptorProviders
      ]
    };
  }
}
