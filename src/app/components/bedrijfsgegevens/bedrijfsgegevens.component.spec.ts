import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedrijfsgegevensComponent } from './bedrijfsgegevens.component';

describe('BedrijfsgegevensComponent', () => {
  let component: BedrijfsgegevensComponent;
  let fixture: ComponentFixture<BedrijfsgegevensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BedrijfsgegevensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BedrijfsgegevensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
