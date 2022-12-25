import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee, EmployeeCategory, EmployeeType } from '@shared/models/employee.model';
import { NumericValidators } from '@shared/validators/nemeric.validator';



@Component({
  selector: 'tia-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  @Output()
  employeeEmitter = new EventEmitter<Employee>();

  @Input()
  employee: Employee;

  @Input()
  show = true;

  form: FormGroup;

  categories: typeof EmployeeCategory = EmployeeCategory;
  types: typeof EmployeeType = EmployeeType;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    if (!this.employee) {
      this.employee = new Employee();
    }

    this.form = this.fb.group({
      id: [this.employee.id],
      category: [{ value: this.employee.category, disabled: !this.show }, Validators.required],
      type: [{ value: this.employee.type, disabled: !this.show }, Validators.required],
      diploma: [{ value: this.employee.diploma, disabled: !this.show }],
      expectedCount: [
        { value: this.employee.expectedCount, disabled: !this.show },
        [Validators.required, NumericValidators.integer]],
    });
  }

  submit() {
    this.activeModal.close(this.form.value);
  }

}
