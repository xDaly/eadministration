import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tia-calculator-input',
  templateUrl: './calculator-input.component.html',
  styleUrls: ['./calculator-input.component.scss']
})
export class CalculatorInputComponent implements OnInit {

  @Input()
  field: number;

  constructor() { }

  ngOnInit() {
  }

}
