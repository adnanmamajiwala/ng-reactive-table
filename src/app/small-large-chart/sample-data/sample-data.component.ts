import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {getSampleData, SampleDataModel} from './sample-data.model';

@Component({
  selector: 'app-sample-data',
  templateUrl: './sample-data.component.html',
  styleUrls: ['./sample-data.component.scss'],
})
export class SampleDataComponent implements OnInit {

  @Output() data = new EventEmitter<SampleDataModel[]>();

  sampleDataList: SampleDataModel[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.sampleDataList = getSampleData();
    this.data.emit(this.sampleDataList);
  }

  add(nameEL: HTMLInputElement, valEl: HTMLInputElement) {
    this.sampleDataList.push({name: nameEL.value, value: Number(valEl.value)});
    this.data.emit(this.sampleDataList);
    nameEL.value = '';
    valEl.value = '';
  }

  delete(dataModel: SampleDataModel) {
    const index = this.sampleDataList.findIndex((v) => v === dataModel);
    this.sampleDataList.splice(index, 1);
    this.data.emit(this.sampleDataList);
  }
}
