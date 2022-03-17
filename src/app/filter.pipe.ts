import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filter: any, propName: string, contains?: boolean): any {
    if (value.length === 0) {
      return value;
    }
    if (filter === null) {
      return value;
    }
    const resultArray = [];
    if (contains) {
      for (const item of value) {
        if (propName === 'expDate') {
          if (item[propName] < this.createDate(filter)) {
            resultArray.push(item);
          }
        }
        else if (propName === 'quantity') {
          if (item[propName] < +filter) {
            resultArray.push(item);
          }
        }


        else if (propName === 'tags') {
          if (filter.length == 0) {
            return value;
          }
          let shouldAdd: boolean;
          let tempArray = [];
          for (const tag of filter) {
            if (shouldAdd == null || shouldAdd) {

              if (item[propName].indexOf(tag) > -1 || item[propName].indexOf(tag.toLowerCase()) > -1 || item[propName].indexOf(this.capitalizeFirstLetter(tag)) > -1) {
                shouldAdd = true;
              }
              else {
                shouldAdd = false;
              }
            }
          }
          if (shouldAdd) {
            tempArray.push(item);
          }
          let uniqueSet = new Set(tempArray);
          for (let entry of uniqueSet) {
            resultArray.push(entry);
          }
        }


        else {
          if ((item[propName]).includes(filter) || item[propName].includes(filter.toLowerCase()) || item[propName].includes(this.capitalizeFirstLetter(filter)) || item[propName].includes(filter.toUpperCase())) {
            resultArray.push(item);
          }
        }
      }
    }
    else {

      for (const item of value) {
        if (item[propName] === filter) {
          resultArray.push(item);
        }
      }
    }
    return resultArray;
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  createDate(string: string) {
    let dateArray = string.split('-');
    return new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2]);
  }


}
