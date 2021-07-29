import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallLargeChartComponent } from './small-large-chart.component';

describe('SmallLargeChartComponent', () => {
  let component: SmallLargeChartComponent;
  let fixture: ComponentFixture<SmallLargeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallLargeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallLargeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
