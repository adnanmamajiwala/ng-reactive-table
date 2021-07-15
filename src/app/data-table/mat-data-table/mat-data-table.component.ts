import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatTableConfiguration} from "./mat-table-configuration.model";

@Component({
  selector: 'app-mat-data-table',
  templateUrl: './mat-data-table.component.html',
  styleUrls: ['./mat-data-table.component.scss']
})
export class MatDataTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() config: MatTableConfiguration<any>;

  dataSource: MatTableDataSource<any>;
  propertyNames: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.propertyNames = this.getPropertyNames();
    this.dataSource = new MatTableDataSource(this.config.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getPropertyNames(): string[] {
    let resp: string[] = [];
    for (let info of this.config.columnInfoList) {
      resp.push(info.name);
    }
    return resp;
  }

}


