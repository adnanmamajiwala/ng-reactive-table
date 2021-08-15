import {AbstractDataSource} from '../../shared/abstract-data-source';
import {Sample, SamplesColumnInfo} from '../samples.model';
import {SamplesService} from '../samples.service';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs';
import {ColumnInfo, Page, SortDirection} from '../../shared/shared.model';
import {SamplesTableOrganizer} from './samples-table.organizer';

export class SamplesTableDatasource extends AbstractDataSource<Sample> {

  private readonly _organizer: SamplesTableOrganizer;

  constructor(private samplesService: SamplesService) {
    super();
    this._organizer = new SamplesTableOrganizer(this.dataSubject);
  }

  load(sortBy: string, sortDirection: SortDirection, pageIndex: number, pageSize: number): void {
    this.loadingSubject.next(true);
    this.samplesService.getAll(pageIndex, pageSize, sortBy, sortDirection)
      .pipe(
        catchError(() => of(new Page<Sample>())),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((val: Page<Sample>) => {
        this._organizer.groupBy(val.content);
        this.totalElements = val.totalElements;
      });
  }

  setupColumnInfo(): ColumnInfo[] {
    return SamplesColumnInfo;
  }

  organizer(): SamplesTableOrganizer {
    return this._organizer;
  }

}
