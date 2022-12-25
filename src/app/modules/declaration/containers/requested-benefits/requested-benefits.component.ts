import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DeclarationService } from '@core/services/declaration/declaration.service';
import { ProjectService } from '@core/services/declaration/project.service';
import { Benefit } from '@shared/models/benefit.model';
import { Declaration } from '@shared/models/Declaration.model';
import { Project } from '@shared/models/project.model';
import { StepperService } from '@shared/services/stepper.service';

@Component({
  selector: 'tia-requested-benefits',
  templateUrl: './requested-benefits.component.html',
  styleUrls: ['./requested-benefits.component.scss']
})
export class RequestedBenefitsComponent implements OnInit {

  project: Project;
  declarationId: number;

  benefits: Array<Benefit>;
  constructor(
    private router: ActivatedRoute,
    private stepperService: StepperService,
    private projectService: ProjectService,
    private declarationService: DeclarationService
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.declarationService.getById(+params['id']).subscribe((declaration: Declaration) => {
        this.declarationId = declaration.id;
        this.project = declaration.project;
        this.projectService.benefitsByField(declaration.project).subscribe((benefits: Array<Benefit>) => this.benefits = benefits);
        this.projectService.projectBenefits(declaration.project).subscribe((benefits: Array<Benefit>) => this.project.benefits = benefits);
      })
    })
  }

  getSelection(selectedBenefits: Array<Benefit>) {
    this.declarationService.UpdateDeclarationStep(this.declarationId, this.stepperService.activatedStep.id + 1).subscribe();
    this.projectService.selectbenefits(selectedBenefits, this.project)
      .subscribe((benefits: Array<Benefit>) => {
        this.project.benefits = benefits
        this.stepperService.forward();
      });
  }


}
