import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ColumnInfo, CustomDataSource} from '../data-table.model';
import {DataTableService} from '../data-table.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {fromEvent, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';

@Component({
  selector: 'app-mat-data-table',
  templateUrl: './mat-data-table.component.html',
  styleUrls: ['./mat-data-table.component.scss']
})
export class MatDataTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  dataSource: CustomDataSource<any>;

  columnInfoList: ColumnInfo[] = [];
  propertyNames: string[] = [];

  constructor(private dataTableService: DataTableService) {
  }

  ngOnInit(): void {
    this.dataTableService.customDataSource$().subscribe(value => {
      if (!!value) {
        this.dataSource = value;
        this.dataSource.load('', 'asc', 1, 5);
        this.columnInfoList = value.columnInfoList;
      }
    });

    this.dataTableService.selectedColumns$()
      .subscribe((value: ColumnInfo[]) => {
        if (!!value) {
          this.propertyNames = value.map<string>(val => val.name);
        }
      });
  }


  ngAfterViewInit() {

    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     debounceTime(150),
    //     distinctUntilChanged(),
    //     tap(() => {
    //       this.paginator.pageIndex = 0;
    //       this.loadLessonsPage();
    //     })
    //   )
    //   .subscribe();

    merge(this.paginator.page)
      .pipe(
        tap(() => this.loadDataPage())
      )
      .subscribe();

  }

  loadDataPage() {
    this.dataSource.load(
      // this.input.nativeElement.value,
      '',
      'asc',
      this.paginator.pageIndex + 1,
      this.paginator.pageSize);
  }

}
