import { Pipe, PipeTransform } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Pipe({
  name: 'ngbDate'
})
export class NgbDatePipe implements PipeTransform {

  constructor(private formatter: NgbDateParserFormatter) {

  }

  transform(value: any): string {
    return this.formatter.format(value);
  }

}
