import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private endpoint = 'https://60f09d078970e90017405d26.mockapi.io/api/v1/employee';

  constructor(private httpClient: HttpClient) {
  }

  getAll(page: number = 1, limit: number = 10,
         sortBy: string = '', sortDirection: string = 'asc'): Observable<Employee[]> {
    const url = `${this.endpoint}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${sortDirection}`;
    return this.httpClient.get<Employee[]>(url);
  }

}
