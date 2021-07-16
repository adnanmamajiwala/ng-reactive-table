import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ColumnInfo, DataTableConfiguration} from './data-table.model';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  private config$ = new BehaviorSubject<DataTableConfiguration<any>>(null as any);
  private selectedColumns$ = new BehaviorSubject<ColumnInfo[]>([]);

  constructor() {
  }

  getConfig$(): Observable<DataTableConfiguration<any>> {
    return this.config$.asObservable();
  }

  updateConfig$(value: DataTableConfiguration<any>) {
    this.config$.next(value);
    this.updateSelectedColumns$(value.columnInfoList);
  }

  getSelectColumns$(): Observable<ColumnInfo[]> {
    return this.selectedColumns$.asObservable();
  }

  updateSelectedColumns$(value: ColumnInfo[]) {
    this.selectedColumns$.next(value);
  }

}
