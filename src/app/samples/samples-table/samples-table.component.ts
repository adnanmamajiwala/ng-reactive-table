import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SamplesService} from '../samples.service';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {CustomPaginatorService} from '../../shared/custom-paginator.service';
import {MatSort} from '@angular/material/sort';
import {ColumnInfo} from '../../shared/shared.model';
import {fromEvent, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {SamplesTableDatasource} from './samples-table.datasource';
import {SamplesFilterRequest} from '../samples.model';

@Component({
  selector: 'app-samples-table',
  templateUrl: './samples-table.component.html',
  styleUrls: ['./samples-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {provide: MatPaginatorIntl, useClass: CustomPaginatorService}
  ]
})
export class SamplesTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') input: ElementRef;

  columnInfoList: ColumnInfo[] = [];
  propertyNames: string[] = [];
  dataSource: SamplesTableDatasource;

  constructor(private samplesService: SamplesService) {
  }

  ngOnInit() {
    this.dataSource = new SamplesTableDatasource(this.samplesService);
    this.dataSource.columnInfo$.subscribe((value: ColumnInfo[]) => {
      this.columnInfoList = value;
      this.propertyNames = value.map<string>(val => val.name);
    });
    this.dataSource.load(this.build('', 'org', 'ASC', 0, 50));
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadDataPage()))
      .subscribe();

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        tap(() => {
          if (this.input.nativeElement.value.length > 3) {
            this.paginator.pageIndex = 0;
            this.sort.active = 'org';
            this.sort.direction = 'asc';
            this.loadDataPage();
          }
        })
      )
      .subscribe();
  }

  loadDataPage() {
    const value = this.input.nativeElement.value;
    const filter = !!value && value.length > 3 ? value : '';
    this.dataSource
      .load(this.build(filter, this.sort.active, this.sort.direction.toUpperCase(), this.paginator.pageIndex, this.paginator.pageSize));
  }

  private build(filterText: string, sortBy: string, sortDir: string, pageNumber: number, pageSize: number): SamplesFilterRequest {
    return {
      filter: filterText,
      sortBy: sortBy,
      sortDirection: sortDir,
      pageIndex: pageNumber,
      pageSize: pageSize,
    };
  }
}

