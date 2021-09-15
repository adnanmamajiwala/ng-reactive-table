import {Component, OnInit} from '@angular/core';
import {ColumnInfo} from '../shared/shared.model';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-and-drop-fixed',
  templateUrl: './drag-and-drop-fixed.component.html',
  styleUrls: ['./drag-and-drop-fixed.component.scss']
})
export class DragAndDropFixedComponent implements OnInit {

  columnInfoList: ColumnInfo[];

  constructor() {
  }

  ngOnInit() {
    this.columnInfoList = SamplesColumns;
  }

  drop(event: CdkDragDrop<any>) {
    let currentIndex = event.container.data.index;
    let previousIndex = event.previousContainer.data.index;
    const selectedItem = event.previousContainer.data.item;
    this.columnInfoList.splice(previousIndex, 1);
    this.columnInfoList.splice(currentIndex, 0, selectedItem);
  }
}

export const SamplesColumns = [
  {name: 'id', displayText: '1 - Id', selected: true},
  {name: 'name', displayText: '2 - Name', selected: true},
  {name: 'org', displayText: '3 - Org', selected: false},
  {name: 'code', displayText: '4 - Code', selected: false},
  {name: 'brand', displayText: '5 - Brand', selected: true},
  {name: 'tax', displayText: '6 - Tax', selected: true},
  {name: 'start', displayText: '7 - Start', selected: true},
  {name: 'end', displayText: '8 - End', selected: true},
  {name: 'total', displayText: '9 - Total', selected: true},
  {name: 'weight', displayText: '10 - weight', selected: false},
  {name: 'unit', displayText: '11 - Unit', selected: false},
  {name: 'price', displayText: '12 - Price', selected: true},
  {name: 'quantity', displayText: '13 - Quantity', selected: false},
  {name: 'batchCode', displayText: '14 - Batch Code', selected: false},
  {name: 'batchName', displayText: '15 - Batch Name', selected: false},
  {name: 'description', displayText: '16 - Description', selected: false},
  {name: 'qrCode', displayText: '17 - QR Code', selected: false},
];
