import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({
  name: 'samplesTable'
})
export class SamplesTablePipe implements PipeTransform {

  transform(value: string, colName: string): string {
    let response: string = value;
    if (colName === 'tax') {
      response = this.convert(value);
    } else if (colName === 'price') {
      response = `$ ${this.convert(value)}`;
    }
    return response;
  }

  private convert(value: string) {
    return new DecimalPipe('en').transform(value, '1.2-2', 'en') || '';
  }
}
