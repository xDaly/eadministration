import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '@shared/models/employee.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'tia-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {

  @Input()
  employee: Employee;
  
  title: string;

  showEmployeeDetails = true;


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  
  }


}