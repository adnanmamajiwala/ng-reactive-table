import {AbstractDataSource} from '../../shared/abstract-data-source';
import {Sample, SamplesColumnInfo} from '../samples.model';
import {SamplesService} from '../samples.service';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs';
import {ColumnInfo, Page} from '../../shared/shared.model';
import {SamplesTableAggregator} from './samples-table.aggregator';

export class SamplesTableDatasource extends AbstractDataSource<Sample> {

  private readonly aggregator: SamplesTableAggregator = new SamplesTableAggregator();

  constructor(private samplesService: SamplesService) {
    super();
  }

  load(filter: string, sortBy: string, sortDirection: string, pageIndex: number, pageSize: number): void {
    this.loadingSubject.next(true);
    this.samplesService.getAll(filter, pageIndex, pageSize, sortBy, sortDirection)
      .pipe(
        catchError(() => of(new Page<Sample>())),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((val: Page<Sample>) => {
        const grouped = this.aggregator.buildGroups(val.content);
        this.dataSubject.next(grouped);
        this.totalElements = val.totalElements;
      });
  }

  setupColumnInfo(): ColumnInfo[] {
    return SamplesColumnInfo;
  }

  isGroup(index: any, item: Sample): boolean {
    return this.aggregator.isGroup(item);
  }

  toggle(row: Sample) {
    const grouped = this.aggregator.collapseGroup(row);
    this.dataSubject.next(grouped);
  }
}
