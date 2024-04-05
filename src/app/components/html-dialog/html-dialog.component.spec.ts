import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlDialogComponent } from './html-dialog.component';

describe('HtmlDialogComponent', () => {
  let component: HtmlDialogComponent;
  let fixture: ComponentFixture<HtmlDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HtmlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
