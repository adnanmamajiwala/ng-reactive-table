import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
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
    const currentIndex = event.container.data.index;
    const previousIndex = event.previousContainer.data.index;
    const selectedItem = event.previousContainer.data.item;
    this.columnInfoList.splice(previousIndex, 1);
    this.columnInfoList.splice(currentIndex, 0, selectedItem);
    this.updateDataTable();
  }

  private updateDataTable(): void {
    const selected = this.columnInfoList.filter((colInfo) => colInfo.selected);
    this.samplesTableDatasource.updateColumns(selected);
  }

}
