import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminModule } from '@modules/admin/admin.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SidebarModule } from 'ng-sidebar';
import { BackOfficeLayoutComponent } from './back-office-layout.component';
import { BackOfficeRoutingModule } from './Back-office-routing.module';
import { UsersComponent } from '@modules/admin/pages/users/users.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AdminModule,
    NgbModule,
    SharedModule,
    BackOfficeRoutingModule,
    AngularFontAwesomeModule,
    SidebarModule.forRoot(),
  ],
  declarations: [BackOfficeLayoutComponent],
  entryComponents: [
    UsersComponent
  ]
})
export class BackOfficeModule { }
