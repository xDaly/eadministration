import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterComponent } from './container/center/center.component';

const homeRoutes: Routes = [
    {
        path: '', component: CenterComponent
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [RouterModule],
    providers: [],
})
export class HomeRoutingModule { }