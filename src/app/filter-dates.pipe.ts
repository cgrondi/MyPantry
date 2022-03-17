import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDates'
})
export class FilterDatesPipe implements PipeTransform {

  transform(value: any, filterDate: Date): any {
    if (value.length === 0) {
      return value
    }
    const resultArray = [];
    for (const item of value) {
      if (item['expDate'] < filterDate) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
