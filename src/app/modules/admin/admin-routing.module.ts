import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "@core/guards/auth.guard";
import { PermissionsComponent } from "./pages/permissions/permissions.component";
import { UsersComponent } from "./pages/users/users.component";

const adminRoutes: Routes = [
    {
        path: 'users', component: UsersComponent
    },
    {
        path: 'permissions', component: PermissionsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule],
    providers: [AuthGuardService]
})
export class AdminRoutingModule { }