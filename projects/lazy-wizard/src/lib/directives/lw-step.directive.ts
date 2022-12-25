import { Directive, HostBinding, ElementRef, HostListener } from '@angular/core';
import { StepRoute, LazyWizardService } from '../lazy-wizard.service';

export class Step {
    public id: number;
    public title: string;
    public relativeRoute: StepRoute;
    public hasNext: boolean;
    public hasPrev: boolean;
    public isActive: boolean = false;
    public isNavigable: boolean = true;
    public isDone: boolean = false;
}

@Directive({
    selector: '[lwStep]'
})
export class LwStepDirective extends Step {

    /**
    * @description step id
    * @returns number
    */
    get id(): number {
        return this.stepperService.routes.indexOf(this.relativeRoute);
    }

    /**
     * @description matchs step with route
     * @returns StepRoute
     */
    get relativeRoute(): StepRoute {
        return this.stepperService.routes.find((route: StepRoute) => this.title == route.title);
    }

    /**
     * @description get step title
     * @returns string
     */
    get title(): string {
        return this.host.nativeElement.textContent;
    }

    /**
     * @description if has a next step
     * @returns boolean
     */
    get hasNext(): boolean {
        return this.stepperService.routes.length !== this.id;
    }

    /**
     * @description if has a pervious step
     * @returns boolean
     */
    get hasPrev(): boolean {
        return this.stepperService.routes.length < this.id;
    }

    /**
     * @description if step is active
     * @returns boolean
     */
    @HostBinding('class.is-active')
    get activated(): boolean {
        return this.isActive;
    }

    /**
     * @description if step is navigable
     * @returns boolean
     */
    @HostBinding('class.not-allowed')
    get navigable() {
        return !this.isNavigable;
    }

    /**
     * @description if step is done
     * @returns boolean
     */
    @HostBinding('class.done')
    get done() {
        return this.isDone;
    }

    /**
     * 
     * navigation trigged state eventes
     * 
    @Output() exit = new EventEmitter();
    @Output() enter = new EventEmitter();
    */

    constructor(private host: ElementRef, private stepperService: LazyWizardService) {
        super();
    }

    @HostListener('click')
    onclick() {
        event.stopPropagation();
        if (!this.isNavigable)
            return;

        console.log(this)
        this.stepperService.currentLocation(this);
    }

}
