import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {getSampleData, ProductInfo} from './sample-data.model';

@Component({
  selector: 'app-sample-data',
  templateUrl: './sample-data.component.html',
  styleUrls: ['./sample-data.component.scss'],
})
export class SampleDataComponent implements OnInit {

  @Output() data = new EventEmitter<ProductInfo[]>();

  products: ProductInfo[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.products = getSampleData();
    this.data.emit(this.products);
  }

  add(nameEL: HTMLInputElement, valEl: HTMLInputElement) {
    this.products.push({name: nameEL.value, rating: Number(valEl.value)});
    this.data.emit(this.products);
    nameEL.value = '';
    valEl.value = '';
  }

  delete(productInfo: ProductInfo) {
    const index = this.products.findIndex((v) => v === productInfo);
    this.products.splice(index, 1);
    this.data.emit(this.products);
  }
}
