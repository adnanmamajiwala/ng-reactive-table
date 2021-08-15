import {AbstractDataSource} from '../../shared/abstract-data-source';
import {Sample, SamplesColumnInfo} from '../samples.model';
import {SamplesService} from '../samples.service';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs';
import {ColumnInfo, Page, SortDirection} from '../../shared/shared.model';
import {SamplesTableAggregator} from './samples-table.aggregator';

export class SamplesTableDatasource extends AbstractDataSource<Sample> {

  private readonly _aggregator: SamplesTableAggregator;

  constructor(private samplesService: SamplesService) {
    super();
    this._aggregator = new SamplesTableAggregator(this.dataSubject);
  }

  load(sortBy: string, sortDirection: SortDirection, pageIndex: number, pageSize: number): void {
    this.loadingSubject.next(true);
    this.samplesService.getAll(pageIndex, pageSize, sortBy, sortDirection)
      .pipe(
        catchError(() => of(new Page<Sample>())),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((val: Page<Sample>) => {
        this._aggregator.groupBy(val.content);
        this.totalElements = val.totalElements;
      });
  }

  setupColumnInfo(): ColumnInfo[] {
    return SamplesColumnInfo;
  }

  aggregator(): SamplesTableAggregator {
    return this._aggregator;
  }

}
