import { Component, OnChanges, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DeclarationService } from '@core/services/declaration/declaration.service';
import { ProductionService } from '@core/services/declaration/production.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DynamicTableService, SplatMap } from '@shared/components/edit-table/dynamic-table.service';
import { Declaration } from '@shared/models/Declaration.model';
import { Production, ProductionType } from '@shared/models/production.model';
import { NumericValidators } from '@shared/validators/nemeric.validator';
import { Observable } from 'rxjs';

@Component({
  selector: 'tia-production-list',
  templateUrl: './production-list.component.html',
  styleUrls: ['./production-list.component.scss'],
  providers: [DynamicTableService]
})
export class ProductionListComponent implements OnInit, OnChanges {

  productionSplat: SplatMap[] = [
    {
      key: 'id',
      label: 'id',
      value: '0',
      show: false
    },
    {
      key: 'designation',
      label: 'Service/Product',
      controlType: 'textbox',
      show: true,
      validators: [{
        name: 'required',
        validator: Validators.required,
        message: ''
      }]
    },
    {
      key: 'quantity',
      label: 'Quantity',
      controlType: 'textbox',
      show: true,
      validators: [{
        name: 'required',
        validator: Validators.required,
        message: ''
      },
      {
        name: 'integer',
        validator: NumericValidators.integer,
        message: ''
      }]
    },
    {
      key: 'areaIrrigated',
      label: 'Irrigated Area',
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
      key: 'dryArea',
      label: 'Dried Area',
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
      key: 'totalArea',
      label: 'Total Area',
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
      key: 'area',
      label: 'Area',
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
      key: 'exploitedArea',
      label: 'Exploited Area',
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
      key: 'clientCategory',
      label: 'Client Category',
      controlType: 'textbox',
      show: true,
      validators: [{
        name: 'required',
        validator: Validators.required,
        message: ''
      }]
    },
    {
      key: 'value',
      label: 'Value',
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

  productions: Array<Production>;

  title: string;

  productionType: typeof ProductionType = ProductionType;

  constructor(private route: ActivatedRoute,
    private productionService: ProductionService,
    private declarationService: DeclarationService,
    private tableService: DynamicTableService) { }

  ngOnChanges() { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.declarationService.getById(+params['id']).subscribe((daclaration: Declaration) => {
        this.productionService.GetProductions(daclaration.project.id, this.productionType).subscribe((productions: Array<Production>) => {
          this.productionSplat.push({
            key: 'projectId',
            label: 'projectId',
            value: daclaration.project.id,
            show: false
          },
            {
              key: 'productionType',
              label: 'productionType',
              value: this.productionType,
              show: false,
            })
          this.productions = this.tableService.map(productions, this.productionSplat);
        })
      })
    })
  }

  getEtity(production) {
    let index = this.productions.findIndex((result) => result.id === production.body.id);
    const newkeys = (result) => this.productionSplat.map(item => {
      return { [item.label]: result[item.key] }
    })
    switch (production.action) {
      case 'create':
        production.body.productionType = +this.productionType;
        this.productionService.insert(production.body).subscribe((result: Production) => this.productions.push(Object.assign({}, ...newkeys(result))))
        break;
      case 'edit':
        this.productionService.update(production.body, production.body.id).subscribe((result: Production) => this.productions[index] = Object.assign({}, ...newkeys(result)))
        break;
      case 'delete':
        this.productionService.delete(production.body.id).subscribe(_ => this.productions.splice(index, 1))
    }
  }

}
