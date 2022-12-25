import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NumericValidators } from '@shared/validators/nemeric.validator';

import { Material } from '@shared/models/material.model';

@Component({
  selector: 'tia-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.scss']
})
export class MaterialFormComponent implements OnInit {

  @Output()
  materialEmitter = new EventEmitter<Material>();

  @Input()
  material: Material;

  @Input()
  show = true;

  form: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if(!this.material){
      this.material = new Material();
    }

    this.form = this.fb.group({
      id: [this.material.id],
      product: [{ value: this.material.product, disabled: !this.show }],
      code: [{ value: this.material.code, disabled: !this.show }],
      origin: [{ value: this.material.origin, disabled: !this.show }],
      quantity: [{ value: this.material.quantity, disabled: !this.show }, NumericValidators.integer],
      unit: [{ value: this.material.unit, disabled: !this.show }],
      value: [{ value: this.material.value, disabled: !this.show }, NumericValidators.decimal],
      comment: [{ value: this.material.comment, disabled: !this.show }],
    });
  }

  submit() {
    this.activeModal.close(this.form.value);
  }

}
