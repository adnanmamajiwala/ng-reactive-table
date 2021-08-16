import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sample} from './samples.model';
import {Page} from '../shared/shared.model';

@Injectable({
  providedIn: 'root'
})
export class SamplesService {

  private endpoint = 'https://sample-jpa-app.herokuapp.com/samples';
  // private endpoint = 'http://localhost:8080/samples';

  constructor(private httpClient: HttpClient) {
  }

  getAll(filter: string = '', pageNumber: number = 0, pageSize: number = 10,
         sortBy: string = '', sortDirection: string): Observable<Page<Sample>> {
    const url = `${this.endpoint}?text=${filter}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`;
    return this.httpClient.get<Page<Sample>>(url);
  }
}
