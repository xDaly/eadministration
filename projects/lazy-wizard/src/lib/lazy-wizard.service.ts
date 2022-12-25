import { Injectable, ComponentRef, ViewContainerRef, ComponentFactoryResolver, Optional, SkipSelf, Type } from '@angular/core';
import { Step } from './directives/lw-step.directive';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LazyWizardService {

  routes: Array<StepRoute>;

  navigationMode: string = 'free' || 'semi-strict' || 'strict';

  onChange$: Observable<Step>;
  onStepEnter$: Observable<Step>;
  onStepExit$: Observable<Step>;

  private container: ViewContainerRef;

  private currentStep: Step;
  private steps: Array<Step>;

  private changedStepSubject = new Subject<Step>();
  private entredStepSubject = new Subject<Step>();
  private exitStepSubject = new Subject<Step>();

  get activatedRoute(): StepRoute {
    return this.routes.find((route: StepRoute) => route.title == this.currentStep.title) || this.routes[0]
  }

  set setSteps(steps: Array<Step>) {
    this.steps = steps;
  }


  constructor(private resolver: ComponentFactoryResolver, @SkipSelf() @Optional() private parent?: LazyWizardService) {
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
    this.routes = routes;
    this.container = container;
  }

  /**
   * This methode allows to identify the current step
   * @param step 
   */
  currentLocation(step: Step = this.currentStep): void {
    this.changedStepSubject.next(step);
  }

  /**
   * Navigate to next step
   * @returns void
   */
  forward(): void {
    this.navigateTo(this.routes.indexOf(this.activatedRoute) + 1);
  }

  /**
   * Navigate to previous step
   * @returns void
   */
  backward(): void {
    this.navigateTo(this.routes.indexOf(this.activatedRoute) - 1);
  }

  /**
   * @description 
   * Inject new route into wizard
   * @param route 
   * @param options 
   */
  addRoute(route: StepRoute, options?: { position: number }): void {
    if (options.position > 0 && !this.routes.find(r => r.title == route.title)) {
      this.routes.splice(options.position, 0, route);
    }
  }

  /**
   * Navigate to a step form index
   * @param stepId 
   * @returns ComponentRef<any>
   */
  navigateTo(stepId: number): ComponentRef<any> {

    let route = this.routes[stepId];

    switch (this.navigationMode) {
      case 'strict':
        this.steps.filter((step: Step) => stepId > step.id).forEach((step: Step) => step.isNavigable = true);
        this.steps.filter((step: Step) => stepId < step.id).forEach((step: Step) => step.isNavigable = false);
        break;
      case 'semi_strict':
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

    this.steps.forEach((step: Step) => step.isActive = false);

    this.container.clear();

    this.currentStep = this.steps[stepId];
    this.currentStep.isActive = true;

    let componentFactory = this.resolver.resolveComponentFactory(route.component);
    return this.container.createComponent(componentFactory);
  }
}

export interface StepRoute {
  title: string;
  component: Type<any>;
}

export enum NavigationMode {
  FREE,
  SEMI_STRICT,
  STRICT,
}
