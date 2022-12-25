import { Component, OnInit } from '@angular/core';
import { ProjectInformationService } from '@core/services/projectInformation/project-information.service';
import { ProjectInformation } from '@shared/models/ProjectInformation';
import { StepperService } from '@shared/services/stepper.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'tia-project-information',
  templateUrl: './project-information.component.html',
  styleUrls: ['./project-information.component.scss']
})
export class ProjectInformationComponent implements OnInit {

  isEdit = false;

  projectInformation = new ProjectInformation();

  constructor(
    private projectInformationService: ProjectInformationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stepperService: StepperService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (!isNaN(id)) {
        console.log(id);

        this.projectInformationService.getById(id).subscribe((projectInformation: ProjectInformation) => {
          this.projectInformation = projectInformation;
          this.projectInformation.declarationId = id;
          console.log(this.projectInformation.declarationId);

          this.isEdit = true;
        });
      }
    });
  }
  save(projectInformation: ProjectInformation) {
    console.log(projectInformation.declarationId);

      projectInformation.screenId = this.stepperService.activatedStep.id + 1;
      this.projectInformationService.update(projectInformation, projectInformation.declarationId)
        .subscribe((projectInformation: ProjectInformation) => {
          this.stepperService.refrechSteps();
          this.stepperService.forward();
        });
    }
    SaveDraft(projectInformation: ProjectInformation) {
      console.log(projectInformation.declarationId);
      projectInformation.screenId = this.stepperService.activatedStep.id;
      this.projectInformationService.update(projectInformation, projectInformation.declarationId)
        .subscribe((projectInformation: ProjectInformation) => {
          this.stepperService.refrechSteps();
        });
    }
  }


