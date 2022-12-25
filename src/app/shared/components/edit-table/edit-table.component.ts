import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DynamicTableService, SplatMap } from './dynamic-table.service';

@Component({
  selector: 'tia-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss'],
  providers: [DynamicTableService]
})
export class EditTableComponent implements OnChanges, OnInit {

  @Input()
  actions: boolean = false;

  @Input()
  splatMap: Array<SplatMap>

  @Input()
  rows: Array<any>;

  @Output()
  model = new EventEmitter<any>();

  form: FormGroup;

  private modalTitle: string;

  private modal: NgbModalRef;

  constructor(private modalService: NgbModal, private tableService: DynamicTableService) { }

  ngOnChanges() {
    if (this.rows) {
      const inter = (this.rows instanceof Array) ? this.rows[0] : this.rows;
      this.splatMap = this.splatMap.filter(_splat => inter.hasOwnProperty(_splat.label))
      this.form = this.tableService.toFormGroup(this.splatMap)

    }
  }

  ngOnInit() {
  }

  open(content) {
    this.modalTitle = 'Create';
    this.modal = this.modalService.open(content, { centered: true });
    this.modal.result.then((result) => {
      this.model.emit({ body: result, action: 'create' });
    }, (reason) => { })
  }

  edit(content, entity) {
    this.modalTitle = 'Edit';
    const newkeys = this.splatMap.map(item => {
      return { [item.key]: entity[item.label] }
    })
    this.form.setValue(Object.assign({}, ...newkeys));
    this.modal = this.modalService.open(content, { centered: true })
    this.modal.result.then((result) => {
      result => this.rows[this.rows.indexOf(entity)] = result
      this.model.emit({ body: result, action: 'edit' });
    }, (reason) => { });

  }

  delete(entity) {
    this.model.emit({ body: entity, action: 'delete' })
  }

  show(content, entity) {
    this.modalTitle = 'Show Details';
    const newkeys = this.splatMap.map(item => {
      return { [item.key]: entity[item.label] }
    })
    this.form.setValue(Object.assign({}, ...newkeys));
    this.modal = this.modalService.open(content, { centered: true });
  }

}