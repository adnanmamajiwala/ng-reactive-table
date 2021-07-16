import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Car} from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private endpoint = 'https://60f09d078970e90017405d26.mockapi.io/api/v1/car';

  constructor(private httpClient: HttpClient) {
  }

  retrieve(page: number = 1, limit: number = 10,
           sortBy: string = '', sortDirection: string = 'asc'): Observable<Car[]> {
    const url = `${this.endpoint}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${sortDirection}`;
    return this.httpClient.get<Car[]>(url);
  }
}
