import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/guards/auth.guard';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { LoginComponent } from '@core/login/login.component';

const appRoutes: Routes = [
  {
    path: '', loadChildren: './core/front-office/front-office.module#FrontOfficeModule',
    canActivate:[AuthGuardService],
    data:
    {
      allowedRoles: ['Promotor']
    }
  },
  {
    path: 'admin', loadChildren: './core/back-office/back-office.module#BackOfficeModule',
    canActivate:[AuthGuardService],
    data:
    {
      allowedRoles: ['SuperAdmin', 'Admin01', 'Admin02']
    }
  },
  {
    path:'login',
    component : LoginComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
