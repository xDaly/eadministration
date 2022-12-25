import { Pipe, PipeTransform } from '@angular/core';
import { SplatMap } from '@shared/components/edit-table/dynamic-table.service';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    for (const enumMember in value) {
      if (!isNaN(parseInt(enumMember, 10))) {
        keys.push({key: enumMember, value: value[enumMember]});
      }
    }
    return keys;
}
}

@Pipe({
  name: 'headers'
})
export class HeadersPipe implements PipeTransform {
  transform(data: any, splatMap: Array<SplatMap>): any {
    const newKeys = splatMap.filter(s => s.show).map((item: SplatMap) => {
      if (data.hasOwnProperty(item.label) && item.show) {

        if (item.controlType === 'dropdown') { return item.options[data[item.label]].value; }
        return data[item.label]
      } else {
        delete data[item.key]
      }
    })

    return newKeys;
  }

}
