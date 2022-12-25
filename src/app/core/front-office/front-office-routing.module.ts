import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@core/login/login.component';
import { FrontOfficeLayoutComponent } from './front-office-layout.component';

const routes: Routes = [
    {
        path: '', component: FrontOfficeLayoutComponent, children:
            [
                {
                    path: '',
                    redirectTo: 'home',
                    pathMatch: 'full'
                },
                {
                    path: 'home', loadChildren: '../../modules/home/home.module#HomeModule'
                },
                {
                    path: 'profile', loadChildren: '../../modules/profile/profile.module#ProfileModule'
                },
                {
                    path: 'service-declaration', loadChildren: '../../modules/declaration/declaration-service.module#DeclarationServiceModule'
                }
            ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class FrontOfficeRoutingModule { }
