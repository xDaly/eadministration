import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@core/guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const profileRoutes: Routes = [
    { path: '', component: ProfileComponent, canActivate: [AuthGuardService] }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(profileRoutes)],
    exports: [RouterModule],
    providers: [],
})
export class ProfileRoutingModule { }