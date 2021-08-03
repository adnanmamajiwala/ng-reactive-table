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
      .subscribe(val => {
        this.dataSubject.next(val);
        this.totalElements = 50;
      });
  }

  setupColumnInfo(): ColumnInfo[] {
    return [
      {name: 'id', displayText: 'Id', selected: true},
      {name: 'manufacture', displayText: 'Manufacture', selected: true},
      {name: 'model', displayText: 'Model', selected: true},
      {name: 'type', displayText: 'Type', selected: true},
      {name: 'fuel', displayText: 'Fuel', selected: true},
      {name: 'color', displayText: 'Color', selected: true},
      {name: 'vin', displayText: 'VIN', selected: true},
      {name: 'createdAt', displayText: 'Launch Date', selected: false},
      {name: 'maxSpeed', displayText: 'Max Speed', selected: false},
      {name: 'gears', displayText: 'Gears', selected: false},
      {name: 'horsePower', displayText: 'Horse Power', selected: false},
      {name: 'engine', displayText: 'Engine', selected: false},
      {name: 'sunroof', displayText: 'Sunroof', selected: false},
      {name: 'electric', displayText: 'Electric', selected: false},
      {name: 'gas', displayText: 'Gas', selected: false},
      {name: 'hybrid', displayText: 'Hybrid', selected: false},
      {name: 'limitedEdition', displayText: 'Limited Edition', selected: false},
    ];
  }

  setupMaxColumns(): number {
    return 10;
  }

}

