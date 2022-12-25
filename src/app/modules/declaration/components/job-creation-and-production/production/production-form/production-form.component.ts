import { Component, DoCheck, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '@shared/models/Orientation';
import { Production, ProductionType } from '@shared/models/production.model';
import { NumericValidators } from '@shared/validators/nemeric.validator';

@Component({
  selector: 'tia-production-form',
  templateUrl: './production-form.component.html',
  styleUrls: ['./production-form.component.scss']
})
export class ProductionFormComponent implements OnInit, DoCheck {

  prod = ProductionType.expected;
  productionType = ProductionType;

  @Output()
  productionEmitter = new EventEmitter<Production>();

  @Input()
  production: Production;

  @Input()
  project: Project;

  @Input()
  show = true;

  productionForm: FormGroup;
  tourismProductionForm: FormGroup;
  agricultureProductionForm: FormGroup;
  agricultureLastYearProductionForm: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (!this.production)
      this.production = new Production();


    this.productionForm = this.fb.group({
      id: [this.production.id],
      designation: [{ value: this.production.designation, disabled: !this.show }, Validators.required],
      quantity: [{ value: this.production.quantity, disabled: !this.show }, [Validators.required, NumericValidators.integer]],
      value: [{ value: this.production.value, disabled: !this.show }, [Validators.required, NumericValidators.decimal]],
      comment: [{ value: this.production.comment, disabled: !this.show }],
    });

    this.agricultureProductionForm = this.fb.group({
      areaIrrigated: [{ value: this.production.areaIrrigated, disabled: !this.show }, [Validators.required, NumericValidators.decimal]],
      dryArea: [{ value: this.production.dryArea, disabled: !this.show }, [Validators.required, NumericValidators.decimal]],
      exploitedArea: [{ value: this.production.exploitedArea, disabled: false }, [Validators.required, NumericValidators.decimal]],
    });

    this.agricultureLastYearProductionForm = this.fb.group({
      area: [{ value: this.production.area, disabled: !this.show }, [Validators.required, NumericValidators.decimal]]
    });

    this.tourismProductionForm = this.fb.group({
      clientCategory: [{ value: this.production.clientCategory, disabled: !this.show }, [Validators.required]]
    })

  }

  ngDoCheck() {
    if (!this.production)
      return;

    let _driedArea = (this.agricultureProductionForm.value.dryArea !== undefined) ? +this.agricultureProductionForm.value.dryArea : 0;
    let _irrigatedArea = (this.agricultureProductionForm.value.areaIrrigated !== undefined) ? +this.agricultureProductionForm.value.areaIrrigated : 0;
    let _exploitedArea = !isNaN(_driedArea + _irrigatedArea) ? _driedArea + _irrigatedArea : 0;
    this.agricultureProductionForm.controls.exploitedArea.setValue(_exploitedArea);
  }


  submit() {
    switch (this.prod) {
      case ProductionType.expected: {
        this.activeModal.close(Object.assign(this.productionForm.value, this.agricultureProductionForm.value));
        break;
      }
      case ProductionType.lastYear: {
        this.activeModal.close(Object.assign(this.productionForm.value, this.agricultureLastYearProductionForm.value));
        break;
      }
      case ProductionType.expected: {
        this.activeModal.close(Object.assign(this.productionForm.value, this.tourismProductionForm.value));
        break;
      }
      case ProductionType.lastYear: {
        this.activeModal.close(Object.assign(this.productionForm.value, this.tourismProductionForm.value));
        break;
      }
      default: this.activeModal.close(this.productionForm); break;
    }
  }

}
