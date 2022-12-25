import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeclarationService } from '@core/services/declaration/declaration.service';
import { Declaration } from '@shared/models/Declaration.model';
import { StepperService } from '@shared/services/stepper.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'tia-validation-issue-method',
  templateUrl: './validation-issue-method.component.html',
  styleUrls: ['./validation-issue-method.component.scss']
})
export class ValidationIssueMethodComponent implements OnInit {

  declaration: Declaration;

  isValid = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stepperService: StepperService,
    private toastrService: ToastrService,
    private declarationService: DeclarationService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.declarationService.getById(+params['id']).subscribe((declaration: Declaration) => this.declaration = declaration)
    })
  }

  getDeliveryMethod(declaration: Declaration) {
    this.declaration.delivranceMode = declaration.delivranceMode;
    this.isValid = declaration.isValidate;
  }

  finish() {
    if (this.isValid) {
      this.declaration.status = 'Submitted';
      this.declarationService.update(this.declaration, this.declaration.id).subscribe((declaration: Declaration) => {
        this.declaration = declaration
        this.router.navigate(['/home'])
      });
    } else {
      this.toastrService.error('Please check the conditions agreement');
    }
  }

}
