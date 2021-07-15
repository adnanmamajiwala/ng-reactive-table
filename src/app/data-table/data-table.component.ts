import {Component, Input, OnInit} from '@angular/core';
import {MatTableConfiguration} from './mat-data-table/mat-table-configuration.model';
import {DataTableService} from './data-table.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [
   DataTableService
  ]
})
export class DataTableComponent implements OnInit {
  @Input() config = new MatTableConfiguration<any>();

  constructor(private dataTableService: DataTableService) {
  }

  ngOnInit(): void {
    this.dataTableService.updateConfig$(this.config);
  }

}

