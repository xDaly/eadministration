import { CommonModule, DatePipe } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgbDateFRParserFormatter } from './components/DateParser/ngb-date-fr-parser-formatter';
import { DynamicFormFieldComponent } from './components/edit-table/dynamic-form-field.component';
import { EditTableComponent } from './components/edit-table/edit-table.component';
import { FilesUploadComponent } from './components/files-upload/files-upload.component';
import { IconloaderComponent } from './components/iconloader/iconloader.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ActiveFieldDirective } from './directives/active-field.directive';
import { OnlyNumberDirective } from './directives/numeric/only-number.directive';
import { StepDirective, StepTitleDirective } from './directives/stepper/step.directive';
import { HeadersPipe, KeysPipe } from './pipe/keys.pipe';
import { NgbDatePipe } from './pipe/ngb-date.pipe';
import { CalculatorService } from './services/calculator.service';
import { ActivitiesService } from './services/common/activities.service';
import { LocationsService } from './services/common/Locations.service';
import { SettingsService } from './services/common/settings.service';
import { StepperService } from './services/stepper.service';
import { LoaderService } from './services/loader.service';

@NgModule({
  imports: [
    CommonModule,
    DropzoneModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    AngularFontAwesomeModule
  ],
  declarations:
    [
      IconloaderComponent,
      FilesUploadComponent,
      NgbDatePipe,
      OnlyNumberDirective,
      StepDirective,
      StepTitleDirective,
      ActiveFieldDirective,
      KeysPipe,
      HeadersPipe,
      EditTableComponent,
      DynamicFormFieldComponent,
      LoaderComponent
    ],
  exports: [
    IconloaderComponent,
    FilesUploadComponent,
    EditTableComponent,
    DynamicFormFieldComponent,
    LoaderComponent,
    NgbDatePipe,
    OnlyNumberDirective,
    StepTitleDirective,
    StepDirective,
    KeysPipe,
    HeadersPipe
  ],
  providers: [
    DatePipe,
    CalculatorService,
    StepperService,
    ActivitiesService,
    LocationsService,
    SettingsService,
    LoaderService,
    NgbActiveModal,
    NgbDateFRParserFormatter,
  ],
  entryComponents: []
})
export class SharedModule { }
