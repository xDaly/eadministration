import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from '@core/helpers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilesUploadComponent } from '@shared/components/files-upload/files-upload.component';
import { ConverterService } from '@shared/converters/converterService';
import { CommonService } from '@shared/services/common/common.service';
import { SharedModule } from '@shared/shared.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BsDropdownModule } from 'ngx-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BusinessInformationFormComponent } from './components/business-information/business-information-form/business-information-form.component';
import { CompanyInformationFormComponent } from './components/company-information/company-information-form/company-information-form.component';
import { ForeignParticipationFormComponent } from './components/company-information/foreign-participation-form/foreign-participation-form.component';
import { ForeignParticipationListComponent } from './components/company-information/foreign-participation-list/foreign-participation-list.component';
import { ForeignParticipationComponent } from './components/company-information/foreign-participation/foreign-participation.component';
import { DeclarantFormComponent } from './components/declarant/declarant-form/declarant-form.component';
import { EquipmentFormComponent } from './components/equipment-indictations/equipment-form/equipment-form.component';
import { EquipmentListComponent } from './components/equipment-indictations/equipment-list/equipment-list.component';
import { EquipmentModalComponent } from './components/equipment-indictations/equipment-modal/equipment-modal.component';
import { EmployeeFormComponent } from './components/job-creation-and-production/employee/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/job-creation-and-production/employee/employee-list/employee-list.component';
import { EmployeeModalComponent } from './components/job-creation-and-production/employee/employee-modal/employee-modal.component';
import { MaterialFormComponent } from './components/job-creation-and-production/material/material-form/material-form.component';
import { MaterialListComponent } from './components/job-creation-and-production/material/material-list/material-list.component';
import { MaterialModalComponent } from './components/job-creation-and-production/material/material-modal/material-modal.component';
import { PervisionalTimetableFormComponent } from './components/job-creation-and-production/pervisional-timetable-form/pervisional-timetable-form.component';
import { ProductionFormComponent } from './components/job-creation-and-production/production/production-form/production-form.component';
import { ProductionListComponent } from './components/job-creation-and-production/production/production-list/production-list.component';
import { ProductionModalComponent } from './components/job-creation-and-production/production/production-modal/production-modal.component';
import { OrientationFormComponent } from './components/orientation/orientation-form/orientation-form.component';
import { AuthorizationFormComponent } from './components/project-authorizations-specifications/authorization-form/authorization-form.component';
import { InvoiceUploadComponent } from './components/project-authorizations-specifications/invoice-upload/invoice-upload.component';
import { ProjectAuthorizationListComponent } from './components/project-authorizations-specifications/project-authorization-list/project-authorization-list.component';
import { ProjectAuthorizationSpecificationFormComponent } from './components/project-authorizations-specifications/project-authorization-specification-form/project-authorization-specification-form.component';
import { ProjectSpecificationListComponent } from './components/project-authorizations-specifications/project-specification-list/project-specification-list.component';
import { SpecificationFormComponent } from './components/project-authorizations-specifications/specification-form/specification-form.component';
import { ProjectCharacteristicsAgricultureFormComponent } from './components/project-characteristics/project-characteristics-agriculture-form/project-characteristics-agriculture-form.component';
import { ProjectCharacteristicsFormComponent } from './components/project-characteristics/project-characteristics-form/project-characteristics-form.component';
import { ProjectInformationFormComponent } from './components/project-information/project-information-form/project-information-form.component';
import { RequestedBenefitsFormComponent } from './components/requested-benefits/requested-benefits-form/requested-benefits-form.component';
import { ValidationIssueMethodFormComponent } from './components/validation-issue-method/validation-issue-method-form/validation-issue-method-form.component';
import { BusinessInformationComponent } from './containers/business-information/business-information.component';
import { CompanyInformationComponent } from './containers/company-information/company-information.component';
import { DeclarantComponent } from './containers/declarant/declarant.component';
import { EquipmentIndictationsComponent } from './containers/equipment-indictations/equipment-indictations.component';
import { JobCreationAndProductionComponent } from './containers/job-creation-and-production/job-creation-and-production.component';
import { OrientationComponent } from './containers/orientation/orientation.component';
import { ProjectAuthorizationsSpecificationsComponent } from './containers/project-authorizations-specifications/project-authorizations-specifications.component';
import { ProjectCharacteristicsComponent } from './containers/project-characteristics/project-characteristics.component';
import { ProjectInformationComponent } from './containers/project-information/project-information.component';
import { RequestedBenefitsComponent } from './containers/requested-benefits/requested-benefits.component';
import { ValidationIssueMethodComponent } from './containers/validation-issue-method/validation-issue-method.component';
import { DeclarationServiceRoutingModule } from './declaration-service-routing.module';
import { DeclarationServiceComponent } from './declaration-service/declaration-service.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DeclarationServiceRoutingModule,
    AngularFontAwesomeModule,
    DropzoneModule,
    BsDropdownModule.forRoot(),
    NgBootstrapFormValidationModule.forRoot(),
    NgxIntlTelInputModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ForeignParticipationComponent,
    DeclarationServiceComponent,
    OrientationComponent,
    DeclarantComponent,
    BusinessInformationComponent,
    CompanyInformationComponent,
    ProjectInformationComponent,
    ProjectAuthorizationsSpecificationsComponent,
    InvoiceUploadComponent,
    BusinessInformationFormComponent,
    OrientationFormComponent,
    DeclarantFormComponent,
    CompanyInformationFormComponent,
    ProjectInformationFormComponent,
    ProjectAuthorizationSpecificationFormComponent,
    ProjectAuthorizationListComponent,
    ProjectSpecificationListComponent,
    ForeignParticipationFormComponent,
    ForeignParticipationListComponent,
    SpecificationFormComponent,
    AuthorizationFormComponent,
    DeclarationServiceComponent,
    RequestedBenefitsComponent,
    EquipmentIndictationsComponent,
    EquipmentFormComponent,
    EquipmentListComponent,
    JobCreationAndProductionComponent,
    EmployeeModalComponent,
    ProductionModalComponent,
    MaterialModalComponent,
    ProjectCharacteristicsComponent,
    ValidationIssueMethodComponent,
    EquipmentListComponent,
    EquipmentModalComponent,
    ProjectCharacteristicsAgricultureFormComponent,
    EmployeeFormComponent,
    MaterialFormComponent,
    ProductionFormComponent,
    EmployeeListComponent,
    MaterialListComponent,
    ProductionListComponent,
    PervisionalTimetableFormComponent,
    ProjectCharacteristicsFormComponent,
    RequestedBenefitsFormComponent,
    ValidationIssueMethodFormComponent
  ],
  exports: [
    DeclarationServiceComponent,
  ],
  providers: [
    CommonService,
    ConverterService,
    httpInterceptorProviders
  ],
  entryComponents: [
    FilesUploadComponent,
    ForeignParticipationComponent,
    InvoiceUploadComponent,
    OrientationComponent,
    DeclarationServiceComponent,
    DeclarantComponent,
    BusinessInformationComponent,
    CompanyInformationComponent,
    ProjectAuthorizationsSpecificationsComponent,
    ProjectInformationComponent,
    ProjectCharacteristicsComponent,
    EquipmentIndictationsComponent,
    JobCreationAndProductionComponent,
    RequestedBenefitsComponent,
    ValidationIssueMethodComponent,
    EquipmentModalComponent,
    EmployeeModalComponent,
    ProductionModalComponent,
    MaterialModalComponent,
    ProjectCharacteristicsComponent,
    EquipmentIndictationsComponent,
    JobCreationAndProductionComponent,
    RequestedBenefitsComponent,
    ValidationIssueMethodComponent,
    ProjectCharacteristicsAgricultureFormComponent,
    ProjectCharacteristicsFormComponent,
    ProductionListComponent
  ]
})
export class DeclarationServiceModule { }
