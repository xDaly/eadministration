import { Component, OnInit, Input } from '@angular/core';
import { Production } from '@shared/models/production.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'tia-production-modal',
  templateUrl: './production-modal.component.html',
  styleUrls: ['./production-modal.component.scss']
})
export class ProductionModalComponent implements OnInit {

  @Input()
  production: Production;
  
  showProductionDetails = true;

  title: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
