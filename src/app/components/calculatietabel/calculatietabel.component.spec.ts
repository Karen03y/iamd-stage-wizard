import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatietabelComponent } from './calculatietabel.component';

describe('CalculatietabelComponent', () => {
  let component: CalculatietabelComponent;
  let fixture: ComponentFixture<CalculatietabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatietabelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculatietabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
