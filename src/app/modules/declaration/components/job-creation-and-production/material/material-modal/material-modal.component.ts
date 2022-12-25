import { Component, OnInit, Input } from '@angular/core';
import { Material } from '@shared/models/material.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'tia-material-modal',
  templateUrl: './material-modal.component.html',
  styleUrls: ['./material-modal.component.scss']
})
export class MaterialModalComponent implements OnInit {
  
  @Input()
  material: Material;
  
  showMaterialDetails = true;

  title: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}