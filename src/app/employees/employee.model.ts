export class Employee {
  id: string;
  name: string;
  avatar: string;
  gender: string;
  address: Address[];
  createdAt: Date;
}

export class Address {
  id: string;
  employeeId: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  createdAt: Date;
}
