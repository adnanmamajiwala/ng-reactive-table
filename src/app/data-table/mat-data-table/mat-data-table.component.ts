import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ColumnInfo} from '../data-table.model';
import {DataTableService} from '../data-table.service';

@Component({
  selector: 'app-mat-data-table',
  templateUrl: './mat-data-table.component.html',
  styleUrls: ['./mat-data-table.component.scss']
})
export class MatDataTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<any>;
  columnInfoList: ColumnInfo[] = [];
  propertyNames: string[] = [];

  constructor(private dataTableService: DataTableService) {
  }

  ngOnInit(): void {
    this.dataTableService.getConfig$().subscribe(value => {
      if (!!value) {
        this.dataSource = new MatTableDataSource(value.data);
        this.columnInfoList = value.columnInfoList;
        this.dataSource.paginator = this.paginator;
      }
    });

    this.dataTableService.getSelectColumns$()
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
