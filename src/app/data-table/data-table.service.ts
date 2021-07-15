import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ColumnInfo, MatTableConfiguration} from './mat-data-table/mat-table-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  private config$ = new BehaviorSubject<MatTableConfiguration<any>>(null as any);
  private selectedColumns$ = new BehaviorSubject<ColumnInfo[]>([]);

  constructor() {
  }

  getConfig$(): Observable<MatTableConfiguration<any>> {
    return this.config$.asObservable();
  }

  updateConfig$(value: MatTableConfiguration<any>){
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
