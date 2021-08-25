import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'samplesTable'
})
export class SamplesTablePipe implements PipeTransform {

  transform(value: string, colName: string): string {
    if(colName === 'tax') return Number(value).toFixed(2);
    if(colName === 'price') return `$ ${Number(value).toFixed(2)}`;
    return value;
  }

}
