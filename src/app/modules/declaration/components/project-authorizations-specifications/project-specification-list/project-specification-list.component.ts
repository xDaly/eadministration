import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Specification } from '@shared/models/Specification';

@Component({
  selector: 'tia-project-specification-list',
  templateUrl: './project-specification-list.component.html',
  styleUrls: ['./project-specification-list.component.scss']
})
export class ProjectSpecificationListComponent implements OnInit {
  @Input() specifications: Specification[];
  @Output() specificationAction = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  action(value: any, action: any) {
    this.specificationAction.emit({specification: value, action: action});
  }

}
