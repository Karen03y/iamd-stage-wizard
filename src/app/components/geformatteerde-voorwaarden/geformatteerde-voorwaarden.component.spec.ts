import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeformatteerdeVoorwaardenComponent } from './geformatteerde-voorwaarden.component';

describe('GeformatteerdeVoorwaardenComponent', () => {
  let component: GeformatteerdeVoorwaardenComponent;
  let fixture: ComponentFixture<GeformatteerdeVoorwaardenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeformatteerdeVoorwaardenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeformatteerdeVoorwaardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
