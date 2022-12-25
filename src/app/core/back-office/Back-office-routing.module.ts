import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@core/guards/auth.guard';
import { PermissionsComponent } from '@modules/admin/pages/permissions/permissions.component';
import { UsersComponent } from '@modules/admin/pages/users/users.component';
import { BackOfficeLayoutComponent } from './back-office-layout.component';

const routes: Routes = [
    {
        path: '', 
        component: BackOfficeLayoutComponent,
        children: [
            {
                path: 'users',
                component: UsersComponent,
            },
            {
                path: 'permissions',
                component: PermissionsComponent
            }
        ],
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class BackOfficeRoutingModule { }
