import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgemeneVoorwaardenComponent } from './algemene-voorwaarden.component';

describe('AlgemeneVoorwaardenComponent', () => {
  let component: AlgemeneVoorwaardenComponent;
  let fixture: ComponentFixture<AlgemeneVoorwaardenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgemeneVoorwaardenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlgemeneVoorwaardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
