import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesColumnSelectorComponent } from './samples-column-selector.component';

describe('SamplesColumnSelectorComponent', () => {
  let component: SamplesColumnSelectorComponent;
  let fixture: ComponentFixture<SamplesColumnSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamplesColumnSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesColumnSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
