import {ChangeDetectorRef, Component, OnInit, TemplateRef} from '@angular/core';
import {DataTableService} from '../data-table.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ColumnInfo} from '../../shared/shared.model';

@Component({
  selector: 'app-column-selectors',
  templateUrl: './column-selectors.component.html',
  styleUrls: ['./column-selectors.component.scss'],
})
export class ColumnSelectorsComponent implements OnInit {

  columnInfoList: ColumnInfo[] = [];

  constructor(private dataTableService: DataTableService<any>,
              private modalService: NgbModal,
              private changeDetRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.dataTableService.customDataSource$()
      .subscribe(value => {
        if (!!value) {
          this.columnInfoList = value.columnInfoList;
          this.updateDataTable();
          this.changeDetRef.detectChanges();
        }
      });
  }

  private getSelected() {
    return this.columnInfoList.filter((colInfo) => colInfo.selected);
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
    this.dataTableService.updateSelectedColumns$(this.getSelected());
  }
}
