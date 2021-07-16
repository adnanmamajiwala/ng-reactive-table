import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ColumnSelectorsComponent} from './column-selectors.component';

describe('ColumnSelectorsComponent', () => {
  let component: ColumnSelectorsComponent;
  let fixture: ComponentFixture<ColumnSelectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnSelectorsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnSelectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
