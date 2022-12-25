import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Declaration, DeliveryModeType } from '@shared/models/Declaration.model';

@Component({
  selector: 'tia-validation-issue-method-form',
  templateUrl: './validation-issue-method-form.component.html',
  styleUrls: ['./validation-issue-method-form.component.scss']
})
export class ValidationIssueMethodFormComponent implements OnChanges {

  @Output()
  deliveryIssueMethod = new EventEmitter();

  @Input()
  declaration: Declaration;

  ValidationIssueForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {

    const declaration: SimpleChange = changes.declaration;

    if (!declaration.firstChange) {
      this.ValidationIssueForm = this.fb.group({
        id: [declaration.currentValue.id],
        delivranceMode: [declaration.currentValue.delivranceMode, Validators.required],
        isValidate: [false, Validators.requiredTrue]
      });
   
      let value = {};

      this.ValidationIssueForm.valueChanges.subscribe(result => {
        value = this.ValidationIssueForm.valid ? result : {};
        this.deliveryIssueMethod.emit(value);
      })
    }
  }

}
