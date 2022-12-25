import { Component, OnInit, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DeclarationService } from '@core/services/declaration/declaration.service';
import { EmployeeService } from '@core/services/declaration/employee.service';
import { DynamicTableService, SplatMap } from '@shared/components/edit-table/dynamic-table.service';
import { Declaration } from '@shared/models/Declaration.model';
import { Employee, EmployeeCategory, EmployeeType } from '@shared/models/employee.model';
import { NumericValidators } from '@shared/validators/nemeric.validator';
import { Observable } from 'rxjs';

@Component({
  selector: 'tia-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [DynamicTableService]
})
export class EmployeeListComponent implements OnInit {

  data: Observable<any>;

  splat: SplatMap[] = [
    {
      key: 'id',
      label: 'id',
      value: '0',
      show: false
    },
    {
      key: 'category',
      label: 'Category',
      controlType: 'dropdown',
      show: true,
      options:[
        {key: '0',  value: 'Worker'},
        {key: '1',  value: 'Technician'},
        {key: '2',   value: 'Administratif'},
        {key: '3', value: 'Foreing'}
      ],
      validators: [{
        name: 'required',
        validator: Validators.required,
        message: ''
      }]
    },
    {
      key: 'type',
      label: 'Type',
      controlType: 'dropdown',
      show: true,
      options:[
        {key: '0',  value: 'Permanent'},
        {key: '1',  value: 'Seasonal'}
      ],
      validators: [{
        name: 'required',
        validator: Validators.required,
        message: ''
      }]
    },
    {
      key: 'diploma',
      label: "Diploma's",
      controlType: 'textbox',
      show: true,
      validators: [{
        name: 'required',
        validator: Validators.required,
        message: ''
      }]
    },
    {
      key: 'hiredCount',
      label: 'Existed Postes Number',
      controlType: 'textbox',
      show: true,
      validators: [{
        name: 'required',
        validator: Validators.required,
        message: ''
      },
      {
        name: 'integer',
        validator: NumericValidators.decimal,
        message: ''
      }]
    },
    {
      key: 'expectedCount',
      label: 'Expected Postes Number',
      controlType: 'textbox',
      show: true,
      validators: [{
        name: 'required',
        validator: Validators.required,
        message: ''
      },
      {
        name: 'integer',
        validator: NumericValidators.decimal,
        message: ''
      }]
    },
    {
      key: 'comment',
      label: 'Comment',
      controlType: 'textbox',
      show: false
    },
  ];

  employees: Array<Employee>

  constructor(private route: ActivatedRoute,
    private declarationService: DeclarationService,
    private emplymentService: EmployeeService,
    private tableService: DynamicTableService) { }

  ngOnInit() {
  
  }

}
