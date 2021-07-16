import {ColumnInfo, CustomDataSource} from '../data-table/data-table.model';
import {Car} from './car.model';
import {CarsService} from './cars.service';
import {of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';

export class CarsDataSource extends CustomDataSource<Car> {

  constructor(private carsService: CarsService) {
    super();
  }

  load(sortBy: string, sortDirection: string, pageIndex: number, pageSize: number): void {
    this.loadingSubject.next(true);
    this.carsService.retrieve(pageIndex, pageSize, sortBy, sortDirection)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(val => this.dataSubject.next(val));
  }

  setupColumnInfo(): ColumnInfo[] {
    return [
      {name: 'id', displayText: 'Id'},
      {name: 'manufacture', displayText: 'Manufacture'},
      {name: 'model', displayText: 'Model'},
      {name: 'type', displayText: 'Type'},
      {name: 'fuel', displayText: 'Fuel'},
      {name: 'color', displayText: 'Color'},
      {name: 'vin', displayText: 'VIN'},
      {name: 'createdAt', displayText: 'Launch Date'}
    ];
  }

}

