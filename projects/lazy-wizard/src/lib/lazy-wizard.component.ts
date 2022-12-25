import { Component, OnInit, ViewChildren, QueryList, ViewChild, ViewContainerRef, Input, AfterViewChecked } from '@angular/core';
import { LazyWizardService, StepRoute, NavigationMode } from './lazy-wizard.service';
import { LwStepDirective, Step } from './directives/lw-step.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'lazyWizard',
  template: `
  <div class="container">
    <div class="navidationBar">
        <ul class="navigationBarLayout">
            <li class="step" *ngFor="let step of stepRoutes" lwStep>{{ step.title }}</li>
        </ul>
    </div>
    <div class="view-frame">
        <ng-template #container></ng-template>
    </div>
  </div>

  `,
  styles: []
})
export class LazyWizardComponent implements OnInit, AfterViewChecked {

  public stepRoutes: Array<StepRoute>; 

  public onChange: Observable<Step>;

  @Input()
  navigationMode: string;

  @Input()
  defaultStepIndex: number = 0;
  
  @ViewChildren(LwStepDirective) steps: QueryList<LwStepDirective>;
  
  @ViewChild("container", { read: ViewContainerRef }) container;

  constructor(private lazyService:LazyWizardService) { }

  ngAfterViewChecked() {
    this.lazyService.setSteps = this.steps.toArray();
    this.lazyService.navigateTo(this.defaultStepIndex);
  }
  
  ngOnInit() {
    this.navigationMode = this.navigationMode;
    this.lazyService.init(this.stepRoutes, this.container);
    this.onChange = this.lazyService.onChange$;
  }

}
