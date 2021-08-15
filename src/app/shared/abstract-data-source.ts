import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {ColumnInfo, Group} from './shared.model';
import {Sample} from '../samples/samples.model';

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

  abstract load(sortBy: string, sortDirection: string, pageIndex: number, pageSize: number): void;

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

export abstract class Organizer<T extends Group> {

  protected constructor(public dataSubject: BehaviorSubject<T[]>) {
  }

  abstract isGroup(index: any, item: Sample): boolean;

  abstract reduceGroup(row: Group): void;

  abstract groupBy(data: T[]): void;

}
