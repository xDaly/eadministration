import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CalculatorService {

  max?: number;

  private subject = new BehaviorSubject<number>(this.max);

  calculate(digit) {
    this.subject.next(this.max - digit);
  }

  get Origin(): number { return this.subject.getValue() }
}
