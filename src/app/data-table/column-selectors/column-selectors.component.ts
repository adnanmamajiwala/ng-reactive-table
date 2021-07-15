import {Component, OnInit} from '@angular/core';
import {ColumnInfo} from '../mat-data-table/mat-table-configuration.model';
import {DataTableService} from '../data-table.service';

@Component({
  selector: 'app-column-selectors',
  templateUrl: './column-selectors.component.html',
  styleUrls: ['./column-selectors.component.scss']
})
export class ColumnSelectorsComponent implements OnInit {

  columnInfoList: ColumnInfo[];
  selectedColumnInfoList: ColumnInfo[];

  constructor(private dataTableService: DataTableService) {
  }

  ngOnInit(): void {
    this.dataTableService.getConfig$().subscribe(value => {
      this.columnInfoList = value.columnInfoList;
      this.selectedColumnInfoList = Array.from(this.columnInfoList);
    });
  }


  onClick($event: any, pos: number, col: ColumnInfo) {
    let isChecked = $event.target.checked;
    if (isChecked) {
      this.selectedColumnInfoList.splice(pos, 0, col);
    } else {
      this.selectedColumnInfoList.splice(pos, 1);
    }
    this.dataTableService.updateSelectedColumns$(this.selectedColumnInfoList);
  }
}
