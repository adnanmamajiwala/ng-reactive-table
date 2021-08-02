export class ProductInfo {
  name: string;
  rating: number;
}

export function getSampleData(): ProductInfo[] {
  return [
    {rating: 200, name: 'A'},
    {rating: 300, name: 'B'},
    {rating: 50, name: 'C'},
    {rating: 3100, name: 'D'},
    {rating: 290, name: 'E'},
    {rating: 20000, name: 'F'},
  ];
}