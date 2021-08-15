import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sample} from './samples.model';
import {Page, SortDirection} from '../shared/shared.model';

@Injectable({
  providedIn: 'root'
})
export class SamplesService {

  private endpoint = 'https://sample-jpa-app.herokuapp.com/samples';

  constructor(private httpClient: HttpClient) {
  }

  getAll(pageNumber: number = 0, pageSize: number = 10,
         sortBy: string = '', sortDirection: SortDirection = 'ASC'): Observable<Page<Sample>> {
    const url = `${this.endpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`;
    return this.httpClient.get<Page<Sample>>(url);
  }
}
