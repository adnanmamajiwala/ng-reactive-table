import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ColumnInfo} from '../data-table.model';
import {DataTableService} from '../data-table.service';

@Component({
  selector: 'app-column-selectors',
  templateUrl: './column-selectors.component.html',
  styleUrls: ['./column-selectors.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColumnSelectorsComponent implements OnInit {

  columnInfoList: ColumnInfo[] = [];
  selectedColumnInfoList: ColumnInfo[] = [];

  constructor(private dataTableService: DataTableService<any>,
              private changeDetRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.dataTableService.customDataSource$()
      .subscribe(value => {
        if (!!value) {
          this.columnInfoList = value.columnInfoList;
          this.selectedColumnInfoList = Array.from(this.columnInfoList);
          this.changeDetRef.detectChanges();
        }
      });
  }

  onClick($event: any, pos: number, col: ColumnInfo) {
    if ($event.target.checked) {
      this.selectedColumnInfoList.splice(pos, 0, col);
    } else {
      this.selectedColumnInfoList.splice(pos, 1);
    }
    this.dataTableService.updateSelectedColumns$(this.selectedColumnInfoList);
  }
}
