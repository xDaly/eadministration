import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DeclarationService } from '@core/services/declaration/declaration.service';
import { EmployeeService } from '@core/services/declaration/employee.service';
import { MaterialService } from '@core/services/declaration/material.service';
import { ProductionService } from '@core/services/declaration/production.service';
import { ProjectService } from '@core/services/declaration/project.service';
import { ProductionListComponent } from '@modules/declaration/components/job-creation-and-production/production/production-list/production-list.component';
import { DynamicTableService, SplatMap } from '@shared/components/edit-table/dynamic-table.service';
import { Declaration } from '@shared/models/Declaration.model';
import { Employee } from '@shared/models/employee.model';
import { Material } from '@shared/models/material.model';
import { Production, ProductionType } from '@shared/models/production.model';
import { StepperService } from '@shared/services/stepper.service';
import { NumericValidators } from '@shared/validators/nemeric.validator';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tia-job-creation-and-production',
  templateUrl: './job-creation-and-production.component.html',
  styleUrls: ['./job-creation-and-production.component.scss'],
  providers: [DynamicTableService]
})
export class JobCreationAndProductionComponent implements OnInit {

  declaration: Declaration;

  timeTable: any;

  @ViewChild('productionList', { read: ViewContainerRef }) productionList: ViewContainerRef;

  employeeSplat: SplatMap[] = [
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
      options: [
        { key: '0', value: 'Worker' },
        { key: '1', value: 'Technician' },
        { key: '2', value: 'Administratif' },
        { key: '3', value: 'Foreing' }
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
      options: [
        { key: '0', value: 'Permanent' },
        { key: '1', value: 'Seasonal' }
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

  employeesList: Array<Employee>;

  productionsList: Array<Production>;
  materialsList: Array<Material>;

  isValidTimeTable: boolean;

  constructor(
    private route: ActivatedRoute,
    private resolver: ComponentFactoryResolver,
    private stepperService: StepperService,
    private toster: ToastrService,
    private declarationService: DeclarationService,
    private projectService: ProjectService,
    private materialService: MaterialService,
    private employeeService: EmployeeService,
    private productionService: ProductionService,
    private tableService: DynamicTableService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.declarationService.getById(+params['id']).subscribe((declaration: Declaration) => {

        this.projectService.getTimeTable(declaration.project).subscribe(result => this.timeTable = result);

        this.materialService.filterBy({ name: 'project', value: declaration.project.id }).subscribe(list => this.materialsList = list);

        this.employeeService.filterBy({ name: 'project', value: declaration.project.id })
          .pipe(map((res) => this.tableService.map(res, this.employeeSplat, {
            key: 'projectId',
            label: 'projectId',
            value: declaration.project.id,
            show: false
          }))).subscribe(list => this.employeesList = list);

        this.rendredProductionList(ProductionType.expected, 'Expected Production')
        if (declaration.project.type !== 0) {
          this.rendredProductionList(ProductionType.lastYear, 'Previous Production')
        }

        this.declaration = declaration;

      })
    })
  }

  rendredProductionList(type: ProductionType, title: string) {
    let factory: ComponentFactory<any>;
    factory = this.resolver.resolveComponentFactory(ProductionListComponent);
    let component = (<ComponentRef<any>>this.productionList.createComponent(factory));
    component.instance.productionType = type
    component.instance.title = title;
  }


  getEmployee(employee) {
    employee.body.projectId = this.declaration.project.id;
    let index = this.employeesList.findIndex((result) => result.id === employee.body.id);
    const newkeys = (result) => this.employeeSplat.map(item => {
      return { [item.label]: result[item.key] }
    })
    switch (employee.action) {
      case 'create':
        this.employeeService.insert(employee.body).subscribe(result => {
          this.employeesList.push(Object.assign({}, ...newkeys(result)))
        });
        break;
      case 'edit':
        this.employeeService.update(employee.body, employee.body.id).subscribe((result: Employee) => {
          this.employeesList[index] = Object.assign({}, ...newkeys(result))
        })
        break;
      case 'delete':
        this.employeeService.delete(employee.body.id).subscribe(_ => this.employeesList.splice(index, 1))
        break;
    }
  }

  getMaterial(material) {
    material.instance.projectId = this.declaration.project.id;
    let index = this.materialsList.findIndex((result) => result.id === material.instance.id);
    switch (material.action) {
      case 'create':
        this.materialService.insert(material.instance).subscribe((result: Material) => this.materialsList.push(result))
        break;
      case 'edit':
        this.materialService.update(material.instance, material.instance.id).subscribe((material: Material) => this.materialsList[index] = material)
        break;
      case 'delete':
        this.materialService.delete(material.instance.id).subscribe(_ => this.materialsList.splice(index, 1))
        break;
    }
  }

  getProduction(production) {
    production.instance.projectId = this.declaration.project.id;
    let index = this.productionsList.findIndex((result) => result.id === production.instance.id);
    switch (production.action) {
      case 'create':
        this.productionService.insert(production.instance).subscribe((result: Production) => this.productionsList.push(result))
        break;
      case 'edit':
        this.productionService.update(production.instance, production.instance.id).subscribe((production: Production) => this.productionsList[index] = production)
        break;
      case 'delete':
        this.productionService.delete(production.instance.id).subscribe(_ => this.productionsList.splice(production, 1))
        break;
    }
  }

  getTimeTable(timeTable) {
    this.timeTable = timeTable;
  }

  next() {
    if (this.timeTable.expectedCreationDate >= this.timeTable.exploitationActivityDate) {
      this.toster.warning('The date of company creation is greater than the date of entry into operating activity');
      return;
    }

    this.timeTable.declarationId = this.declaration.id;
    this.timeTable.screenId = this.stepperService.activatedStep.id + 1;

    this.projectService.updateTimeTable(this.timeTable, this.declaration.project.id)
      .subscribe(result => this.timeTable = result);

    this.stepperService.forward();
  }

  SaveDraft() {
    this.timeTable.declarationId = this.declaration.id;
    this.timeTable.screenId = this.stepperService.activatedStep.id;
    this.projectService.updateTimeTable(this.timeTable, this.declaration.project.id).subscribe(result => this.timeTable = result);
  }
}



