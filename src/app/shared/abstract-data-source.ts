import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {ColumnInfo} from './shared.model';

export abstract class AbstractDataSource<DataType, FilterRequest> implements DataSource<DataType> {

  protected dataSubject: BehaviorSubject<DataType[]>;
  protected columnInfoSubject: BehaviorSubject<ColumnInfo[]>;
  protected loadingSubject: BehaviorSubject<boolean>;
  public loading$: Observable<boolean>;
  public columnInfo$: Observable<ColumnInfo[]>;
  public totalElements: number;

  protected constructor() {
    this.dataSubject = new BehaviorSubject<DataType[]>([]);
    const filtered = this.setupColumnInfo().filter((colInfo) => colInfo.selected);
    this.columnInfoSubject = new BehaviorSubject<ColumnInfo[]>(filtered);
    this.loadingSubject = new BehaviorSubject<boolean>(false);
    this.loading$ = this.loadingSubject.asObservable();
    this.columnInfo$ = this.columnInfoSubject.asObservable();
  }

  abstract load(filterRequest: FilterRequest): void;

  abstract setupColumnInfo(): ColumnInfo[];

  updateColumns(columnInfos: ColumnInfo[]): void {
    this.columnInfoSubject.next(columnInfos);
  }

  connect(collectionViewer: CollectionViewer): Observable<DataType[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }
}

