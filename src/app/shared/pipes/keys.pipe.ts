import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value, args:string[]) : any {
    let keys = [];
    console.log('kkkk');

    for (var enumMember in value) {
      if (!isNaN(parseInt(enumMember, 10))) {
        console.log('once');

        keys.push({key: enumMember, value: value[enumMember]});
        // Uncomment if you want log
        // console.log("enum member: ", value[enumMember]);
      }
    }
    return keys;
}
}
