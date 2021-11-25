import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-jalaali';

@Pipe({
  name: 'persianDate'
})
export class PersianDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const today = moment().format();
    if (today.toString() === value + '') {
      return 'امروز';
    }

    const date = new Date(value);
    const momentDate = moment(date);

    return  momentDate.format('jYYYY/jMM/jDD');
  }
}
