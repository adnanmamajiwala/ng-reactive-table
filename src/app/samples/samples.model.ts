import {Group} from '../shared/shared.model';

export class Sample extends Group {
  id: number;
  org: string;
  name: string;
  code: string;
  description: string;
  brand: string;
  tax: number;
  start: number;
  end: number;
  total: number;
  weight: number;
  unit: string;
  price: number;
  quantity: number;
  batchCode: string;
  batchName: string;
  qrCode: string;
  createDate: string;
}

export class SamplesFilterRequest {
  filter: string;
  sortBy: string;
  sortDirection: string;
  pageIndex: number;
  pageSize: number;
}

export const SamplesColumnInfo = [
  {name: 'id', displayText: 'Id', selected: true},
  {name: 'name', displayText: 'Name', selected: true},
  {name: 'org', displayText: 'Org', selected: false},
  {name: 'code', displayText: 'Code', selected: false},
  {name: 'brand', displayText: 'Brand', selected: true},
  {name: 'tax', displayText: 'Tax', selected: true},
  {name: 'start', displayText: 'Start', selected: true},
  {name: 'end', displayText: 'End', selected: true},
  {name: 'total', displayText: 'Total', selected: true},
  {name: 'weight', displayText: 'weight', selected: false},
  {name: 'unit', displayText: 'Unit', selected: false},
  {name: 'price', displayText: 'Price', selected: true},
  {name: 'quantity', displayText: 'Quantity', selected: false},
  {name: 'batchCode', displayText: 'Batch Code', selected: false},
  {name: 'batchName', displayText: 'Batch Name', selected: false},
  {name: 'description', displayText: 'Description', selected: false},
  {name: 'qrCode', displayText: 'QR Code', selected: false},
];
