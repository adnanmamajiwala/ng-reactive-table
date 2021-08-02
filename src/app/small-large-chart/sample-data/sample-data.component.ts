import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {getSampleData, CompanyFinancialInfo} from './sample-data.model';

@Component({
  selector: 'app-sample-data',
  templateUrl: './sample-data.component.html',
  styleUrls: ['./sample-data.component.scss'],
})
export class SampleDataComponent implements OnInit {

  @Output() data = new EventEmitter<CompanyFinancialInfo[]>();

  financialInfos: CompanyFinancialInfo[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.financialInfos = getSampleData();
    this.data.emit(this.financialInfos);
  }

  add(nameEL: HTMLInputElement, valEl: HTMLInputElement) {
    this.financialInfos.push({companyName: nameEL.value, turnOverAmount: Number(valEl.value)});
    this.data.emit(this.financialInfos);
    nameEL.value = '';
    valEl.value = '';
  }

  delete(dataModel: CompanyFinancialInfo) {
    const index = this.financialInfos.findIndex((v) => v === dataModel);
    this.financialInfos.splice(index, 1);
    this.data.emit(this.financialInfos);
  }
}
