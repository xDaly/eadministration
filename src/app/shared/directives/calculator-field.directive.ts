import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';
import { CalculatorService } from '../services/calculator.service';
import { Subscription } from 'rxjs';


@Directive({
  selector: '[tiaCalculatorField]'
})
export class CalculatorFieldDirective{

  @HostBinding('style.color')
  threshold = 'black';

  visited: Array<string> = [];

  subscription: Subscription;

  get value() { return this.el.nativeElement.value }
  set value(digit: number) { this.el.nativeElement.value = digit; }

  constructor(public el: ElementRef, private calculatorService: CalculatorService) {}

  @HostListener('focus', ['$event'])
  onfocus(event) { 
    if(this.visited.indexOf(event.target.name) === -1){
      if(this.calculatorService.max < 0) {
        this.calculatorService.max = 0;
      }else{
        this.value = this.calculatorService.max;
        this.threshold = 'red'
      }
    }
  }

  @HostListener('blur', ['$event'])
  onblur(event) {
    this.threshold = 'black';
    this.visited.push(event.target.name);
  }

  @HostListener('change')
  onchange() {
    if(this.value < 0 || this.calculatorService.max < 0){
      this.calculatorService.max = 0;
      this.value = 0;
      return;
    }

    if(this.value > this.calculatorService.max)
      return;

    this.calculatorService.max -= this.value;
  }

}

