import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropFixedComponent } from './drag-and-drop-fixed.component';

describe('DragAndDropFixedComponent', () => {
  let component: DragAndDropFixedComponent;
  let fixture: ComponentFixture<DragAndDropFixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragAndDropFixedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
