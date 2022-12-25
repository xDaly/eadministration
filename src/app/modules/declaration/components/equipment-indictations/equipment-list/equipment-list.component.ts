import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Equipement } from '@shared/models/equipment.model';
import { EquipmentModalComponent } from '../equipment-modal/equipment-modal.component';


@Component({
  selector: 'tia-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements DoCheck {


  modal: NgbModalRef;

  @Input()
  equipments: Array<Equipement>

  @Output()
  equipmentOutput = new EventEmitter();

  totalEquipments: number = 0;

  constructor(private modalService: NgbModal) { }

  ngDoCheck() {
    if (this.equipments && this.equipments.length >= 1) {
      this.totalEquipments = this.equipments
        .map(equipment => equipment.value)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
    }
  }

  create() {
    this.modal = this.modalService.open(EquipmentModalComponent, { centered: true });
    this.modal.componentInstance.title = 'Create';
    this.modal.result.then((result: Equipement) => {
      this.equipmentOutput.emit({ body: result, action: 'create' });
    }, (reason) => { });
  }

  edit(entity) {
    this.modal = this.modalService.open(EquipmentModalComponent, { centered: true });
    this.modal.componentInstance.title = 'Edit';
    this.modal.componentInstance.equipment = entity;

    this.modal.result.then((result: Equipement) => {
      this.equipmentOutput.emit({ body: result, action: 'edit' });
    }, (reason) => { });
  }

  delete(entity) {
    this.equipmentOutput.emit({ body: entity, action: 'delete' });
  }

  show(entity) {
    this.modal = this.modalService.open(EquipmentModalComponent, { centered: true });
    this.modal.componentInstance.title = 'View Details';
    this.modal.componentInstance.equipment = entity;
    this.modal.componentInstance.showEquipmentDetails = false;
  }
}
