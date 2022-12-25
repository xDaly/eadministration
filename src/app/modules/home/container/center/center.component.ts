import { AfterViewChecked, Component, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ApplicationHistoryListComponent } from '@modules/home/components/application-history-list/application-history-list.component';
import { CurrentCaseListComponent } from '@modules/home/components/current-case-list/current-case-list.component';
import { DraftListComponent } from '@modules/home/components/draft-list/draft-list.component';
import { Step, StepDirective } from '@shared/directives/stepper/step.directive';
import { NavigationMode, StepperService, StepRoute } from '@shared/services/stepper.service';

@Component({
  selector: 'tia-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit, AfterViewChecked {

  segments: StepRoute[] = [
    { title: 'Current Cases', component: CurrentCaseListComponent },
    { title: 'Application History', component: ApplicationHistoryListComponent },
    { title: 'Draft', component: DraftListComponent },
  ];

  @ViewChildren(StepDirective) steps: QueryList<StepDirective>;

  @ViewChild("container", { read: ViewContainerRef }) container;

  constructor(
    private stepperService: StepperService,
  ) { }

  ngAfterViewChecked() {
    this.stepperService.setSteps = this.steps.toArray();

  }

  ngOnInit() {
    this.stepperService.navigationMode = NavigationMode.FREE;
    this.stepperService.init(this.segments, this.container);
    this.stepperService.navigateTo(0).subscribe({ error(error) { console.log(error) } });
    this.stepperService.onChange$.subscribe((step: Step) => {
      this.stepperService.navigateTo(step.id).subscribe({ error(error) { console.log(error) } });
    });

  }
}
