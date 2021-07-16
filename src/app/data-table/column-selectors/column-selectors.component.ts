import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ColumnInfo} from '../data-table.model';
import {DataTableService} from '../data-table.service';

@Component({
  selector: 'app-column-selectors',
  templateUrl: './column-selectors.component.html',
  styleUrls: ['./column-selectors.component.scss']
})
export class ColumnSelectorsComponent implements OnInit {

  columnInfoList: ColumnInfo[] = [];
  selectedColumnInfoList: ColumnInfo[] = [];

  constructor(private dataTableService: DataTableService,
              private changeDetRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.dataTableService.getConfig$()
      .subscribe(value => {
        if (!!value) {
          this.columnInfoList = value.columnInfoList;
          this.selectedColumnInfoList = Array.from(this.columnInfoList);
          this.changeDetRef.detectChanges();
        }
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
