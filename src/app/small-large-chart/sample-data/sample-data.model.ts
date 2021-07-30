export class SampleDataModel {
  name: string;
  value: number;
}

export function getSampleData(): SampleDataModel[] {
  return [
    {value: 200, name: 'A'},
    {value: 300, name: 'B'},
    {value: 50, name: 'C'},
    {value: 3100, name: 'D'},
    {value: 290, name: 'E'},
    {value: 20000, name: 'F'},
  ];
}