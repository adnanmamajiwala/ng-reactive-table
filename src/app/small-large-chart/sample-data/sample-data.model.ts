export class CompanyFinancialInfo {
  companyName: string;
  turnOverAmount: number;
}

export function getSampleData(): CompanyFinancialInfo[] {
  return [
    {turnOverAmount: 200, companyName: 'A'},
    {turnOverAmount: 300, companyName: 'B'},
    {turnOverAmount: 50, companyName: 'C'},
    {turnOverAmount: 3100, companyName: 'D'},
    {turnOverAmount: 290, companyName: 'E'},
    {turnOverAmount: 20000, companyName: 'F'},
  ];
}