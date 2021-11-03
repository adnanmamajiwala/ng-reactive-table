export class ProductInfo {
  name: string;
  rating: number;
}

export function getSampleData(): ProductInfo[] {
  let products: ProductInfo[] = [];
  for (let i = 0; i < 200; i++) {
    products.push({rating: getRandomInt(1, 100000), name: getRandomName()});
  }

  return products;
}

export function getRandomName(): string {
  return (Math.random() + 1).toString(36).substring(7);
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}