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

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.columnInfoList = this.samplesTableDatasource.setupColumnInfo();
    this.updateDataTable();
  }

  onClick($event: any, pos: number, col: ColumnInfo, cb: HTMLInputElement) {
    col.selected = $event.target.checked;
    this.updateDataTable();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnInfoList, event.previousIndex, event.currentIndex);
    this.updateDataTable();
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, {scrollable: true});
  }

  private updateDataTable(): void {
    const selected = this.columnInfoList.filter((colInfo) => colInfo.selected);
    this.samplesTableDatasource.updateColumns(selected);
  }

}
