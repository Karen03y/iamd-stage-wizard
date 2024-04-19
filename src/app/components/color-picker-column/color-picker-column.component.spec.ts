import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerColumnComponent } from './color-picker-column.component';

describe('ColorPickerColumnComponent', () => {
  let component: ColorPickerColumnComponent;
  let fixture: ComponentFixture<ColorPickerColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPickerColumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorPickerColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
