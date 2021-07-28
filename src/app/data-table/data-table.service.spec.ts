import {TestBed} from '@angular/core/testing';

import {DataTableService} from './data-table.service';

describe('DataTableService', () => {
  let service: DataTableService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
