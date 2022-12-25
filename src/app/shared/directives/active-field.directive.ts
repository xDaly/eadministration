import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[tiaActiveField]'
})
export class ActiveFieldDirective {

  @Input('tiaActiveField')
  activiy = 'agriculture';

  constructor() { }


}
