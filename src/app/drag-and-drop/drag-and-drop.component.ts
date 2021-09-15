import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ColumnInfo} from '../shared/shared.model';
import {SamplesColumnInfo} from '../samples/samples.model';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {

  columnInfoList: ColumnInfo[] = SamplesColumnInfo;

  constructor() {
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<any>) {
    let currentIndex = event.container.data.index;
    let previousIndex = event.previousContainer.data.index;
    const selectedItem = event.previousContainer.data.item;
    this.columnInfoList.splice(previousIndex, 1);
    this.columnInfoList.splice(currentIndex, 0, selectedItem);
    // this.columnInfoList[currentIndex] = selectedItem;
  }
}