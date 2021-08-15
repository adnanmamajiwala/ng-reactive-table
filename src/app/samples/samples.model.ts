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

export const SamplesColumnInfo = [
  {name: 'id', displayText: 'Id', selected: true},
  {name: 'name', displayText: 'Name', selected: true},
  {name: 'code', displayText: 'Code', selected: true},
  {name: 'description', displayText: 'Description', selected: true},
  {name: 'brand', displayText: 'Brand', selected: true},
  {name: 'tax', displayText: 'Tax', selected: true},
  {name: 'start', displayText: 'Start', selected: false},
  {name: 'end', displayText: 'End', selected: false},
  {name: 'total', displayText: 'Total', selected: false},
  {name: 'weight', displayText: 'weight', selected: false},
  {name: 'unit', displayText: 'Unit', selected: false},
  {name: 'price', displayText: 'Price', selected: false},
  {name: 'quantity', displayText: 'Quantity', selected: false},
  {name: 'batchCode', displayText: 'Batch Code', selected: false},
  {name: 'batchName', displayText: 'Batch Name', selected: false},
  {name: 'qrCode', displayText: 'QR Code', selected: false},
];
