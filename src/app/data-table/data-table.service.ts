import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CustomDataSource} from './data-table.model';
import {ColumnInfo} from '../shared/column-info.model';

@Injectable({
  providedIn: 'root'
})
export class DataTableService<T> {

  private customDataSourceSubject = new BehaviorSubject<CustomDataSource<T>>(null as any);
  private selectedColumnsSubject = new BehaviorSubject<ColumnInfo[]>([]);
  private rowClickedSubject = new BehaviorSubject<T>(null as any);

  constructor() {
  }

  customDataSource$(): Observable<CustomDataSource<T>> {
    return this.customDataSourceSubject.asObservable();
  }

  updateCustomDataSource$(value: CustomDataSource<T>) {
    this.customDataSourceSubject.next(value);
    this.updateSelectedColumns$(value.columnInfoList);
  }

  selectedColumns$(): Observable<ColumnInfo[]> {
    return this.selectedColumnsSubject.asObservable();
  }

  updateSelectedColumns$(value: ColumnInfo[]) {
    this.selectedColumnsSubject.next(value);
  }

  rowClicked$(): Observable<T> {
    return this.rowClickedSubject.asObservable();
  }

  updateRowClicked(value: T) {
    this.rowClickedSubject.next(value);
  }
}
