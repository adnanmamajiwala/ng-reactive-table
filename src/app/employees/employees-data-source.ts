import {CustomDataSource} from '../data-table/data-table.model';
import {Employee} from './employee.model';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs';
import {EmployeesService} from './employees.service';
import {ColumnInfo} from '../shared/column-info.model';

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
      .subscribe(val => {
        this.dataSubject.next(val);
        this.totalElements = 50;
      });
  }

  setupColumnInfo(): ColumnInfo[] {
    return [
      {name: 'id', displayText: 'Id', selected: true},
      {name: 'name', displayText: 'Name', selected: true},
      {name: 'avatar', displayText: 'Image Url', selected: true},
      {name: 'gender', displayText: 'Gender', selected: false},
      {name: 'createdAt', displayText: 'Join Date', selected: true}
    ];
  }

  setupMaxColumns(): number {
    return 4;
  }

}
