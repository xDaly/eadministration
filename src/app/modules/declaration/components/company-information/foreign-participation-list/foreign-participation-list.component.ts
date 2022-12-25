import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ForeignParticipation } from '@shared/models/ForeignParticipation';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'tia-foreign-participation-list',
  templateUrl: './foreign-participation-list.component.html',
  styleUrls: ['./foreign-participation-list.component.scss']
})
export class ForeignParticipationListComponent implements OnInit {
  @Input() foreignParticipations: Array<ForeignParticipation>;
  @Output() foreignParticipationOutput = new EventEmitter();
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  updateAction(participation: ForeignParticipation, actionName) {
    this.foreignParticipationOutput.emit({ value: participation, action: actionName });
  }

}
