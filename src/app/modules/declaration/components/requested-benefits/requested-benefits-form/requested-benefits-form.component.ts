import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, SimpleChange, OnChanges, DoCheck } from '@angular/core';
import { Benefit } from '@shared/models/benefit.model';
import { StepperService } from '@shared/services/stepper.service';
import { Project } from '@shared/models/project.model';
import { ProjectService } from '@core/services/declaration/project.service';



@Component({
  selector: 'tia-requested-benefits-form',
  templateUrl: './requested-benefits-form.component.html',
  styleUrls: ['./requested-benefits-form.component.scss']
})
export class RequestedBenefitsFormComponent implements OnChanges {

  @Input()
  project: Project;

  @Input()
  benefits: Array<Benefit>

  @Output()
  selectedBenefits = new EventEmitter<Array<Benefit>>();
  draftBenefits = new EventEmitter<Array<Benefit>>();

  constructor(private stepperService: StepperService, private projectService: ProjectService) { }

  ngOnChanges(changes: SimpleChanges) {

    const project: SimpleChange = changes.project;

    if (this.benefits !== undefined && this.project !== undefined) {
      this.benefits.forEach((benefit: Benefit) => {
        this.project.benefits.forEach((projectBenefit: Benefit) => {
          if (projectBenefit.id == benefit.id)
            benefit.isChecked = true
        });
      });
    }
  }

  submit() {
    let selection: Array<Benefit> = [];

    selection = this.benefits.filter((benefit: Benefit) => { return benefit.isChecked === true });

    if (selection.length < 0)
      return;

    this.selectedBenefits.emit(selection);

  }

  SaveDraft() {
    let selection: Array<Benefit> = [];

    selection = this.benefits.filter((benefit: Benefit) => { return benefit.isChecked === true });

    this.projectService.selectbenefits(selection, this.project).subscribe((benefits: Array<Benefit>) => this.project.benefits = benefits);

  }


}
