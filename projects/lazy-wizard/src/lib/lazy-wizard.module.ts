import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { LwStepDirective } from './directives/lw-step.directive';
import { LazyWizardComponent } from './lazy-wizard.component';
import { StepRoute } from './lazy-wizard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LazyWizardComponent, LwStepDirective],
  exports: [LazyWizardComponent],
})
export class LazyWizardModule {
  constructor(){}
  public static forChild(components):ModuleWithProviders<LazyWizardModule>{
    return {
      ngModule: LazyWizardModule,
      providers:[{provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: components}]
    }
  }
}

