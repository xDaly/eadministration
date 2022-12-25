import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { asyncScheduler, BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import { Step } from '../directives/stepper/step.directive';

@Injectable()
export class StepperService {

  routesSubject: BehaviorSubject<Array<StepRoute>> = new BehaviorSubject(null);

  navigationMode: NavigationMode;

  onChange$: Observable<Step>;
  onStepEnter$: Observable<Step>;
  onStepExit$: Observable<Step>;

  private container: ViewContainerRef;

  private currentStep: Step;
  private steps: Array<Step>;
  private completedSteps: Array<Step>;

  private changedStepSubject = new Subject<Step>();
  private entredStepSubject = new Subject<Step>();
  private exitStepSubject = new Subject<Step>();

  get routes() {
    return this.routesSubject.getValue();
  }

  get routes$() {
    return this.routesSubject.asObservable();
  }

  get activatedStep() {
    return this.currentStep
  }

  get activatedRoute(): StepRoute {
    return this.routes.find((route: StepRoute) => route.title == this.currentStep.title) || this.routes[0]
  }

  set setSteps(steps: Array<Step>) {
    this.steps = steps;
  }


  constructor(private resolver: ComponentFactoryResolver) {
    this.onStepEnter$ = this.entredStepSubject.asObservable();
    this.onStepExit$ = this.exitStepSubject.asObservable();
    this.onChange$ = this.changedStepSubject.asObservable();
  }

  /**
   * @description
   * Initialize stepper with routes and append them to a view container
   * @param routes
   * @param container
   */
  init(routes: Array<StepRoute>, container: ViewContainerRef): void {
    this.routesSubject.next(routes);
    this.container = container;
  }

  /**
   * This methode allows to identify the current step
   * @param step
   */
  currentLocation(step: Step): void {
    this.changedStepSubject.next(step);
  }

  /**
   * Navigate to next step
   * @returns void
   */
  forward(): void {
    this.refrechSteps();
    this.navigateTo(this.currentStep.id + 1).subscribe();
  }

  /**
   * Navigate to previous step
   * @returns void
   */
  backward(): void {
    this.navigateTo(this.currentStep.id - 1).subscribe();
  }

  /**
   * @description
   * Inject new route into stepper
   * @param route
   * @param options
   */
  addRoute(route: StepRoute, options?: { position: number }): void {
    if (options.position > 0 && !this.routes.find(r => r.title == route.title)) {
      this.routes.splice(options.position, 0, route)
    }
  }

  removeRoute(route: StepRoute, options?: { position: number }): void {
    const index = this.routes.indexOf(this.routes.find(r => r.title == route.title));
    this.routes.splice(index, 1);
  }

  /**
   * Navigate to a step form index
   * @param stepId
   * @returns ComponentRef<any>
   */
  navigateTo(stepId: number): Observable<any> {

    return this.routes$.pipe(
      subscribeOn(asyncScheduler),
      map(routes => {

        let route = routes[stepId];

        this.currentStep = this.steps[stepId];

        this.steps.forEach((step: Step) => step.isActive = false);

        this.currentStep.isActive = true;

        switch (this.navigationMode) {
          case NavigationMode.STRICT:
            this.steps.filter((step: Step) => stepId > step.id).forEach((step: Step) => { step.isNavigable = true; step.isDone = true; });
            this.steps.filter((step: Step) => stepId < step.id).forEach((step: Step) => { step.isNavigable = false; step.isDone = false; } );
            break;
          case NavigationMode.SEMI_STRICT:

            this.steps.filter((step: Step) => stepId > step.id)
              .forEach((step: Step) => step.isDone = true);
            this.steps.filter((step: Step) => stepId < step.id)
              .forEach((step: Step) => step.isDone ? step.isNavigable = true : step.isNavigable = false);

            if (this.currentStep) {
              this.currentStep.isNavigable = true;
              this.currentStep.isDone = true;
            }
            break;

          default: this.steps.forEach((step: Step) => step.isNavigable = true);
        }

        this.container.clear();

        let componentFactory = this.resolver.resolveComponentFactory(route.component);
        <typeof route.component>this.container.createComponent(componentFactory);
        this.refrechSteps();
        return this.currentStep;
      })
    )

  }

  refrechSteps() {
    this.steps.filter((step: Step) => this.currentStep.id < step.id).forEach((step: Step) => { step.isDone = false; step.isNavigable = false });
    this.steps.filter((step: Step) => this.currentStep.id > step.id).forEach((step: Step) => { step.isDone = true; step.isNavigable = true });
  }

}

export interface StepRoute {
  title: string;
  component: any;
}

export enum NavigationMode {
  FREE,
  SEMI_STRICT,
  STRICT,
}
