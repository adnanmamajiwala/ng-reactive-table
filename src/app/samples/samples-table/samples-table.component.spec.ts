import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesTableComponent } from './samples-table.component';

describe('SamplesTableComponent', () => {
  let component: SamplesTableComponent;
  let fixture: ComponentFixture<SamplesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamplesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
