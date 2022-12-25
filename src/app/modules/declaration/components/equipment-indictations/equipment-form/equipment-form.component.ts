import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Equipement } from '@shared/models/equipment.model';
import { NumericValidators } from '@shared/validators/nemeric.validator';


@Component({
  selector: 'tia-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.scss']
})
export class EquipmentFormComponent implements OnInit {

  @Output()
  equipmentEmitter = new EventEmitter<Equipement>();

  @Input()
  equipment: Equipement;

  @Input()
  show = true;

  title: string;
  equipmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
    ) { }

  ngOnInit(): void {
    if (!this.equipment) {
      this.equipment = new Equipement();
    }

    this.equipmentForm = this.fb.group({
      id: [this.equipment.id],
      designation: [{ value: this.equipment.designation, disabled: !this.show }, Validators.required],
      quantity: [{ value: this.equipment.quantity, disabled: !this.show }, [Validators.required, NumericValidators.integer]],
      value: [{ value: this.equipment.value, disabled: !this.show }, [Validators.required, NumericValidators.decimal]],
      comment: [{ value: this.equipment.comment, disabled: !this.show }],
    });
  }

  submit() {
    this.activeModal.close(this.equipmentForm.value)
  }
}

