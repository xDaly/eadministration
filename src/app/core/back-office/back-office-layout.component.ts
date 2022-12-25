import { AfterViewChecked, Component, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { UsersComponent } from '@modules/admin/pages/users/users.component';
import { Step, StepDirective } from '@shared/directives/stepper/step.directive';
import { NavigationMode, StepperService, StepRoute } from '@shared/services/stepper.service';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { User } from '@shared/models/User.model';
import { navItems } from '@modules/admin/_nav';

@Component({
    selector: 'tia-back-office-layout',
    templateUrl: './back-office-layout.component.html',
    styleUrls: ['./back-office-layout.component.scss']
})
export class BackOfficeLayoutComponent implements OnInit, AfterViewChecked {

    user: User;

    public navItems = navItems;
    private _opened: boolean = true;

    // segments: StepRoute[] = [
    //     { title: 'Users', component: UsersComponent },
    //     { title: 'Roles', component: UsersComponent },
    // ];

    @ViewChildren(StepDirective) steps: QueryList<StepDirective>;

    @ViewChild("container", { read: ViewContainerRef }) container;

    constructor(
        private authService: AuthenticationService,
        private stepperService: StepperService,
    ) { }

    ngAfterViewChecked() {
        this.stepperService.setSteps = this.steps.toArray();
    }

    ngOnInit() {
        this.authService.getProfile().subscribe(user => this.user = user);
        this.stepperService.navigationMode = NavigationMode.FREE;
        this.stepperService.init(this.navItems, this.container);

        this.stepperService.onChange$.subscribe((step: Step) => {
            this.stepperService.navigateTo(step.id);
        });
    }

    private _toggleSidebar() {
        this._opened = !this._opened;
    }
}
