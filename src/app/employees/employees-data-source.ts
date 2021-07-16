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
      {name: 'id', displayText: 'Id'},
      {name: 'name', displayText: 'Name'},
      {name: 'avatar', displayText: 'Avatar'},
      {name: 'gender', displayText: 'Gender'},
      {name: 'createdAt', displayText: 'Join Date'}
    ];
  }

}
