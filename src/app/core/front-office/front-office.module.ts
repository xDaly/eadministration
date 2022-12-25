import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FrontOfficeLayoutComponent } from './front-office-layout.component';
import { FrontOfficeRoutingModule } from './front-office-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FrontOfficeRoutingModule,
    AngularFontAwesomeModule
  ],
  declarations: [FrontOfficeLayoutComponent],
  bootstrap: [FrontOfficeLayoutComponent]
})
export class FrontOfficeModule { }
