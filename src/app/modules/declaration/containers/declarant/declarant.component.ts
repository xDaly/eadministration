import { Component, OnInit } from '@angular/core';
import { DeclarantService } from '@core/services/Declarant/declarant.service';
import { Declarant } from '@shared/models/Declarant';
import { StepperService } from '@shared/services/stepper.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'tia-declarant',
  templateUrl: './declarant.component.html',
  styleUrls: ['./declarant.component.scss']
})
export class DeclarantComponent implements OnInit {
  declarant = new Declarant();;
  isEdit = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private declarantService: DeclarantService,
    private stepperService: StepperService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.declarant.declarationId = id;
      this.declarantService.getById(id).subscribe((declarant: Declarant) => {
        this.declarant = declarant;
        this.declarant.declarationId = id;
        this.isEdit = true;
      });
      }
    });
  }

  save(NewDeclarant: Declarant) {
    NewDeclarant.screenId = this.stepperService.activatedStep.id + 1;
      this.declarantService.update(NewDeclarant, NewDeclarant.id).subscribe(() => {
        this.stepperService.refrechSteps();
        this.stepperService.forward();
    }, () => {});
  }

  saveDraft(NewDeclarant: Declarant) {
    NewDeclarant.screenId = this.stepperService.activatedStep.id;
    this.declarantService.update(NewDeclarant, NewDeclarant.id).subscribe(() => {
      this.stepperService.refrechSteps();
  }, () => {});
  
}


}


