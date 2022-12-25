import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Authorization } from '@shared/models/Authorization';

@Component({
  selector: 'tia-project-authorization-list',
  templateUrl: './project-authorization-list.component.html',
  styleUrls: ['./project-authorization-list.component.scss']
})
export class ProjectAuthorizationListComponent implements OnInit {

  @Input() authorizations: Authorization[];
  @Output() authorizationActions = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  action(value: any, action: any) {
    this.authorizationActions.emit({authorization: value, action: action});
  }

}
