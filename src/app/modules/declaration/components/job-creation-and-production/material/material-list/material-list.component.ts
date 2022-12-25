import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Material } from '@shared/models/material.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModalComponent } from '../material-modal/material-modal.component';
@Component({
  selector: 'tia-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit {

  modal: NgbModalRef;

  @Input()
  materials: Array<Material>

  @Output()
  materialOutput = new EventEmitter();
    
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }


  create() {
    this.modal = this.modalService.open(MaterialModalComponent, { centered: true });
    this.modal.componentInstance.title = 'Create';
    this.modal.result.then((result) => {
      this.materialOutput.emit({ instance: result, action: 'create' });
    },(reason)=>{});
  }

  edit(entity) {
    this.modal = this.modalService.open(MaterialModalComponent, { centered: true });
    this.modal.componentInstance.title = 'Edit';
    this.modal.componentInstance.material = entity;

    this.modal.result.then((result) => {
      this.materialOutput.emit({ instance: result, action: 'edit' });
    },(reason)=>{});
  }

  delete(entity) {
    this.materialOutput.emit({ instance: entity, action: 'delete' });
  }

  show(entity) {
    this.modal = this.modalService.open(MaterialModalComponent, { centered: true });
    this.modal.componentInstance.title = 'View Details';
    this.modal.componentInstance.material = entity;
    this.modal.componentInstance.showMaterialDetails = false;
  }
}
