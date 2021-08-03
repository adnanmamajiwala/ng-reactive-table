import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';

export class ColumnInfo {
  displayText: string;
  name: string;
  selected = true;
}

export abstract class CustomDataSource<T> implements DataSource<T> {

  public readonly columnInfoList: ColumnInfo[];
  public readonly maxColumns: number;
  protected dataSubject = new BehaviorSubject<T[]>([]);
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public totalElements: number;

  protected constructor() {
    this.columnInfoList = this.setupColumnInfo();
    this.maxColumns = this.setupMaxColumns();
  }

  abstract load(sortBy: string, sortDirection: string, pageIndex: number, pageSize: number): void;

  protected abstract setupColumnInfo(): ColumnInfo[];

  protected abstract setupMaxColumns(): number;

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

}
