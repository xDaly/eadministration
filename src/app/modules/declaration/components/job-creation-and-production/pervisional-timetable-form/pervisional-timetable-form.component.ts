import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NumericValidators } from '@shared/validators/nemeric.validator';




@Component({
  selector: 'tia-pervisional-timetable-form',
  templateUrl: './pervisional-timetable-form.component.html',
  styleUrls: ['./pervisional-timetable-form.component.scss']
})
export class PervisionalTimetableFormComponent implements OnChanges {

  @Input()
  timeTable: any;

  @Output()
  timeTableOutput = new EventEmitter();

  timeTableForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    const timeTable: SimpleChange = changes.timeTable;

    if (timeTable.firstChange)
      return;

    this.timeTable = timeTable.currentValue;

    console.log(this.timeTable)

    this.timeTableForm = this.fb.group({
      id: [this.timeTable.id],
      declarationId: [this.timeTable.declarationId],
      screenId: [this.timeTable.screenId],
      orderDate: [this.timeTable.orderDate, [Validators.required, NumericValidators.year]],
      expectedCreationDate: [this.timeTable.expectedCreationDate, [Validators.required, NumericValidators.year]],
      exploitationActivityDate: [this.timeTable.exploitationActivityDate, [Validators.required, NumericValidators.year]],
      orderDateTitle: [this.timeTable.orderDateTitle]
    });

    this.timeTableForm.valueChanges.subscribe(result => {
      this.timeTableOutput.emit(result);
    })
  }
}
