import { Component, OnInit } from '@angular/core';
import { StepperService } from '@shared/services/stepper.service';

@Component({
  selector: 'tia-project-authorizations-specifications',
  templateUrl: './project-authorizations-specifications.component.html',
  styleUrls: ['./project-authorizations-specifications.component.scss']
})
export class ProjectAuthorizationsSpecificationsComponent implements OnInit {

  constructor(private stepperService: StepperService) { }

  ngOnInit() {

  }
  save() {
    console.log(this.stepperService.activatedStep.id);

    this.stepperService.forward();
  }
}
