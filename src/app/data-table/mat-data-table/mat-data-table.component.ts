import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ColumnInfo, CustomDataSource} from '../data-table.model';
import {DataTableService} from '../data-table.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-mat-data-table',
  templateUrl: './mat-data-table.component.html',
  styleUrls: ['./mat-data-table.component.scss']
})
export class MatDataTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: CustomDataSource<any>;

  columnInfoList: ColumnInfo[] = [];
  propertyNames: string[] = [];

  constructor(private dataTableService: DataTableService) {
  }

  ngOnInit(): void {
    this.dataTableService.customDataSource$().subscribe(value => {
      if (!!value) {
        this.dataSource = value;
        this.dataSource.load('', 'asc', 1, 10);
        this.columnInfoList = value.columnInfoList;
      }
    });

    this.dataTableService.selectedColumns$()
      .subscribe((value: ColumnInfo[]) => {
        if (!!value) {
          this.propertyNames = this.getPropertyNames(value);
          console.log(this.propertyNames);
        }
      });
  }

  ngAfterViewInit() {
  }

  getPropertyNames(columnInfoList: ColumnInfo[]): string[] {
    let resp: string[] = [];
    for (let info of columnInfoList) {
      resp.push(info.name);
    }
    return resp;
  }

}
