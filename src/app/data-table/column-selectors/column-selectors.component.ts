import {ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ColumnInfo} from '../data-table.model';
import {DataTableService} from '../data-table.service';
import {CdkDragEnter, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-column-selectors',
  templateUrl: './column-selectors.component.html',
  styleUrls: ['./column-selectors.component.scss'],
})
export class ColumnSelectorsComponent implements OnInit {

  isCollapsed = false;
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

  onClick($event: any, pos: number, col: ColumnInfo) {
    col.selected = $event.target.checked;
    this.updateDataTable();
  }

  drag(event: CdkDragEnter<any>) {
    moveItemInArray(this.columnInfoList, event.item.data, event.container.data);
  }

  drop(){
    this.updateDataTable();
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  private updateDataTable(): void {
    const selectedColumnInfoList = this.columnInfoList.filter((value) => value.selected);
    this.dataTableService.updateSelectedColumns$(selectedColumnInfoList);
  }
}
