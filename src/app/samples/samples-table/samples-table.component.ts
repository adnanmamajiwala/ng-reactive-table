import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SamplesService} from '../samples.service';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {CustomPaginatorService} from '../../shared/custom-paginator.service';
import {MatSort} from '@angular/material/sort';
import {ColumnInfo} from '../../shared/shared.model';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';
import {SamplesTableDatasource} from './samples-table.datasource';
import {SamplesTableOrganizer} from './samples-table.organizer';

@Component({
  selector: 'app-samples-table',
  templateUrl: './samples-table.component.html',
  styleUrls: ['./samples-table.component.scss'],
  providers: [
    {provide: MatPaginatorIntl, useClass: CustomPaginatorService}
  ]
})
export class SamplesTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnInfoList: ColumnInfo[] = [];
  propertyNames: string[] = [];
  dataSource: SamplesTableDatasource;
  organizer: SamplesTableOrganizer;

  constructor(public samplesService: SamplesService) {
  }

  ngOnInit() {
    this.dataSource = new SamplesTableDatasource(this.samplesService);
    this.organizer = this.dataSource.organizer();
    this.dataSource.columnInfo$.subscribe((value: ColumnInfo[]) => {
      this.columnInfoList = value;
      this.propertyNames = value.map<string>(val => val.name);
    });
    this.dataSource.load('org', 'ASC', 0, 50);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(
      this.sort.sortChange,
      this.paginator.page)
      .pipe(tap(() => this.loadDataPage()))
      .subscribe();
  }

  loadDataPage() {
    this.dataSource
      .load('org', 'ASC', this.paginator.pageIndex, this.paginator.pageSize);
  }

}

