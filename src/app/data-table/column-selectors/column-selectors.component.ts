import {ChangeDetectorRef, Component, OnInit, TemplateRef} from '@angular/core';
import {ColumnInfo} from '../data-table.model';
import {DataTableService} from '../data-table.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-column-selectors',
  templateUrl: './column-selectors.component.html',
  styleUrls: ['./column-selectors.component.scss'],
})
export class ColumnSelectorsComponent implements OnInit {

  columnInfoList: ColumnInfo[] = [];
  private max = 0;
  private config: MatSnackBarConfig;
  private message = '';

  constructor(private dataTableService: DataTableService<any>,
              private modalService: NgbModal,
              private snackBar: MatSnackBar,
              private changeDetRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.dataTableService.customDataSource$()
      .subscribe(value => {
        if (!!value) {
          this.columnInfoList = value.columnInfoList;
          this.max = value.maxColumns
          this.message = `Max columns allowed on this table is '${this.max}'\n\nPlease unselected an existing column\nin order to add a new column to the table`;
          this.updateDataTable();
          this.changeDetRef.detectChanges();
        }
      });
    this.config = {
      duration: 7000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: 'column-selectors-sb',
    };
  }

  private getSelected() {
    return this.columnInfoList.filter((colInfo) => colInfo.selected);
  }


  onClick($event: any, pos: number, col: ColumnInfo, cb: HTMLInputElement) {
    const selected = $event.target.checked;
    if (this.max <= this.getSelected().length && selected) {
      this.snackBar.open(this.message, 'X', this.config);
      cb.checked = false;
    } else {
      col.selected = selected;
      this.updateDataTable();
    }
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
