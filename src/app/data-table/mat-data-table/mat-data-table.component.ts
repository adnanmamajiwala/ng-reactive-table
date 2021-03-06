import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CustomDataSource} from '../data-table.model';
import {DataTableService} from '../data-table.service';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CustomPaginatorService} from '../../shared/custom-paginator.service';
import {ColumnInfo} from '../../shared/shared.model';

@Component({
  selector: 'app-mat-data-table',
  templateUrl: './mat-data-table.component.html',
  styleUrls: ['./mat-data-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {provide: MatPaginatorIntl, useClass: CustomPaginatorService}
  ]
})
export class MatDataTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: CustomDataSource<any>;

  columnInfoList: ColumnInfo[] = [];
  propertyNames: string[] = [];

  constructor(private dataTableService: DataTableService<any>) {
  }

  ngOnInit(): void {
    this.dataTableService.customDataSource$().subscribe((value: CustomDataSource<any>) => {
      if (!!value) {
        this.dataSource = value;
        this.dataSource.load('', 'asc', 1, 5);
        this.columnInfoList = value.columnInfoList;
      }
    });

    this.dataTableService.selectedColumns$().subscribe((value: ColumnInfo[]) => {
      if (!!value) {
        this.propertyNames = value.map<string>(val => val.name);
      }
    });
  }


  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadDataPage();
        })
      )
      .subscribe();
  }

  loadDataPage() {
    this.dataSource.load(
      this.sort.active,
      this.sort.direction,
      // '','asc',
      this.paginator.pageIndex + 1,
      this.paginator.pageSize);
  }

  rowClicked(row: any) {
    this.dataTableService.updateRowClicked(row);
  }
}
