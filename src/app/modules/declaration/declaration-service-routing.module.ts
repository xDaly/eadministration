import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeclarationServiceComponent } from './declaration-service/declaration-service.component';
import { AuthGuardService } from '@core/guards/auth.guard';

const declarationServiceRoutes: Routes = [
    { path: 'create', component: DeclarationServiceComponent, canActivate: [AuthGuardService] },
    { path: ':id/edit', component: DeclarationServiceComponent, canActivate: [AuthGuardService] }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(declarationServiceRoutes),
    ],
    exports: [RouterModule],
    providers: [],
})
export class DeclarationServiceRoutingModule { }
