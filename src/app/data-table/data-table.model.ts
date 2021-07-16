import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';

export class ColumnInfo {
  displayText: string;
  name: string;
}

export abstract class CustomDataSource<T> implements DataSource<T> {

  protected dataSubject = new BehaviorSubject<T[]>([]);
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly _columnInfoList: ColumnInfo[];

  public loading$ = this.loadingSubject.asObservable();

  abstract load(filter: string, sortDirection: string, pageIndex: number, pageSize: number): void;

  abstract setupColumnInfo(): ColumnInfo[];

  protected constructor() {
    this._columnInfoList = this.setupColumnInfo();
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    console.log('Connecting data source');
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  get columnInfoList(): ColumnInfo[] {
    return this._columnInfoList;
  }

}
