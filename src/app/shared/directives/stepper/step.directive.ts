import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';
import { StepperService, StepRoute } from '../../services/stepper.service';

export class Step {
    public title: string;
    public relativeRoute: StepRoute;
    public hasNext: boolean;
    public hasPrev: boolean;
    public isActive: boolean = false;
    public isNavigable: boolean = true;
    public isDone: boolean = false;

    constructor(public stepperService: StepperService){}
    /**
     * @description step id
     * @returns number
     */
    get id(): number {
        return this.stepperService.routes.indexOf(this.relativeRoute);
    }

    set id(value){
        this.id = value;
    }
}

@Directive({
    selector: '[stepTitle]'
})
export class StepTitleDirective extends Step {

    /**
     * @description get step title
     * @returns string
     */
    get title(): string {
        return <string>this.host.nativeElement.textContent;
    }

    /**
     *
     */
    constructor(private host: ElementRef, public stepperService:StepperService) { super(stepperService) }
}

@Directive({
    selector: '[step]',
    providers: [StepTitleDirective]
})
export class StepDirective extends Step {

    /**
     * @description matchs step with route
     * @returns StepRoute
     */
    get relativeRoute(): StepRoute {
        return this.stepperService.routes.find((route: StepRoute) => this.stepTile.title === route.title);
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

    constructor(private stepTile: StepTitleDirective, public stepperService: StepperService) {
        super(stepperService);
    }

    @HostListener('click')
    onclick() {
        event.stopPropagation();
        if (!this.isNavigable)
            return;

        this.stepperService.currentLocation(this);
    }
}

