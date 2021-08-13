import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupByMatTableComponent } from './group-by-mat-table.component';

describe('GroupByMatTableComponent', () => {
  let component: GroupByMatTableComponent;
  let fixture: ComponentFixture<GroupByMatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupByMatTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupByMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
