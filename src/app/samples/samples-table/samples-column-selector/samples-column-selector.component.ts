import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {SamplesTableDatasource} from '../samples-table.datasource';
import {ColumnInfo} from '../../../shared/shared.model';

@Component({
  selector: 'app-samples-column-selector',
  templateUrl: './samples-column-selector.component.html',
  styleUrls: ['./samples-column-selector.component.scss']
})
export class SamplesColumnSelectorComponent implements OnInit {

  @Input() samplesTableDatasource: SamplesTableDatasource;
  columnInfoList: ColumnInfo[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.columnInfoList = this.samplesTableDatasource.setupColumnInfo();
    this.updateDataTable();
  }

  onClick($event: any, pos: number, col: ColumnInfo) {
    col.selected = $event.target.checked;
    this.updateDataTable();
  }

  drop(event: CdkDragDrop<any>) {
    let currentIndex = event.container.data.index;
    let previousIndex = event.previousContainer.data.index;
    const selectedItem = event.previousContainer.data.item;

    if (previousIndex > currentIndex) {
      for (previousIndex; previousIndex > currentIndex; previousIndex--) {
        this.columnInfoList[previousIndex] = this.columnInfoList[previousIndex - 1];
      }
    } else {
      for (previousIndex; previousIndex < currentIndex; previousIndex++) {
        this.columnInfoList[previousIndex] = this.columnInfoList[previousIndex + 1];
      }
    }

    this.columnInfoList[currentIndex] = selectedItem;
    this.updateDataTable();
  }

  private updateDataTable(): void {
    const selected = this.columnInfoList.filter((colInfo) => colInfo.selected);
    this.samplesTableDatasource.updateColumns(selected);
  }

}
