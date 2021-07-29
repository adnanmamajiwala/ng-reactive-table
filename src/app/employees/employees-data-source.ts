import {ColumnInfo, CustomDataSource} from '../data-table/data-table.model';
import {Employee} from './employee.model';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs';
import {EmployeesService} from './employees.service';

export class EmployeesDataSource extends CustomDataSource<Employee> {

  constructor(private employeesService: EmployeesService) {
    super();
  }

  load(sortBy: string, sortDirection: string, pageIndex: number, pageSize: number): void {
    this.loadingSubject.next(true);
    this.employeesService.getAll(pageIndex, pageSize, sortBy, sortDirection)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(val => this.dataSubject.next(val));
  }

  setupColumnInfo(): ColumnInfo[] {
    return [
      {name: 'id', displayText: 'Id', selected: true},
      {name: 'name', displayText: 'Name', selected: true},
      {name: 'avatar', displayText: 'Image Url', selected: true},
      {name: 'gender', displayText: 'Gender', selected: true},
      {name: 'createdAt', displayText: 'Join Date', selected: true}
    ];
  }

}
