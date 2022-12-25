import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SidebarModule } from 'ng-sidebar';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminRoutingModule } from './admin-routing.module';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SidebarModule.forRoot(),
    AngularFontAwesomeModule,
    Ng2SmartTableModule,
    FormsModule,
    NgbModule,
  ],
  declarations: [UsersComponent, PermissionsComponent]
})
export class AdminModule { }
