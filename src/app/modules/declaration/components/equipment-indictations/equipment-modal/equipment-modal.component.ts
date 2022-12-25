import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Equipement } from '@shared/models/equipment.model';

@Component({
  selector: 'tia-equipment-modal',
  templateUrl: './equipment-modal.component.html',
  styleUrls: ['./equipment-modal.component.scss']
})
export class EquipmentModalComponent implements OnInit {


  @Input()
  equipment: Equipement;
  
  showEquipmentDetails = true;

  title:string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
