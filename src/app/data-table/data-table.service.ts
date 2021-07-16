import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ColumnInfo, CustomDataSource} from './data-table.model';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  private customDataSourceSubject = new BehaviorSubject<CustomDataSource<any>>(null as any);
  private selectedColumnsSubject = new BehaviorSubject<ColumnInfo[]>([]);

  constructor() {
  }

  customDataSource$(): Observable<CustomDataSource<any>> {
    return this.customDataSourceSubject.asObservable();
  }

  updateCustomDataSource$(value: CustomDataSource<any>) {
    this.customDataSourceSubject.next(value);
    this.updateSelectedColumns$(value.columnInfoList);
  }

  selectedColumns$(): Observable<ColumnInfo[]> {
    return this.selectedColumnsSubject.asObservable();
  }

  updateSelectedColumns$(value: ColumnInfo[]) {
    this.selectedColumnsSubject.next(value);
  }

}
