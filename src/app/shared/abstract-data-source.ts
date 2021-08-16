import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {ColumnInfo} from './shared.model';

export abstract class AbstractDataSource<T> implements DataSource<T> {

  protected dataSubject: BehaviorSubject<T[]>;
  protected columnInfoSubject: BehaviorSubject<ColumnInfo[]>;
  protected loadingSubject: BehaviorSubject<boolean>;
  public loading$: Observable<boolean>;
  public columnInfo$: Observable<ColumnInfo[]>;
  public totalElements: number;

  protected constructor() {
    this.dataSubject = new BehaviorSubject<T[]>([]);
    this.columnInfoSubject = new BehaviorSubject<ColumnInfo[]>(this.setupColumnInfo());
    this.loadingSubject = new BehaviorSubject<boolean>(false);
    this.loading$ = this.loadingSubject.asObservable();
    this.columnInfo$ = this.columnInfoSubject.asObservable();
  }

  abstract load(filter: string, sortBy: string, sortDirection: string, pageIndex: number, pageSize: number): void;

  abstract setupColumnInfo(): ColumnInfo[];

  updateColumns(columnInfos: ColumnInfo[]): void {
    this.columnInfoSubject.next(columnInfos);
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }
}

