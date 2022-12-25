import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ForeignParticipation } from '@shared/models/ForeignParticipation';

@Component({
  selector: 'tia-foreign-participation',
  templateUrl: './foreign-participation.component.html',
  styleUrls: ['./foreign-participation.component.scss']
})
export class ForeignParticipationComponent implements OnInit {
  foreignConfig: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  submit(foreignParticipation: ForeignParticipation) {
    this.activeModal.close(foreignParticipation);
  }



}
