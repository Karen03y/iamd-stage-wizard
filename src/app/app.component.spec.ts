import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoadContentService } from './services/load-content.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loadContentServiceSpy: jasmine.SpyObj<LoadContentService>;

  beforeEach(async () => {
    const loadContentSpy = jasmine.createSpyObj('LoadContentService', ['loadContent']);

    await TestBed.configureTestingModule({
      declarations: [], 
      imports: [HttpClientModule], 
      providers: [
        { provide: LoadContentService, useValue: loadContentSpy }
      ]
    }).compileComponents();

    loadContentServiceSpy = TestBed.inject(LoadContentService) as jasmine.SpyObj<LoadContentService>;

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  /******************************************************************/
  //test of AppComp correct w aangemaakt
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  /******************************************************************/
  // test of standaard inhoud w geladen bij init
  it('should load default content on init', () => {
    const header = { content: 'header content' };
    const main = { content: 'main content' };
    const footer = { content: 'footer content' };

  // verwachte waarden in voor de loadContentServiceSpy
    loadContentServiceSpy.loadContent.withArgs('header1.html', 'header').and.returnValue(of(header));
    loadContentServiceSpy.loadContent.withArgs('main1.html', 'main').and.returnValue(of(main));
    loadContentServiceSpy.loadContent.withArgs('footer1.html', 'footer').and.returnValue(of(footer));

  // ngOnInit aanroepen
    component.ngOnInit();

  // controle of inhoud overeenk met verwachte waarden
    expect(component.selectedHeader).toEqual(header);
    expect(component.selectedMain).toEqual(main);
    expect(component.selectedFooter).toEqual(footer);
  });

  /******************************************************************/
  // test of omschakelen content werkt zoals verwacht
  it('should toggle content', () => {
    const option = { title: 'Header', content: { type: 'header' }, showContent: true };

    component.toggleContent(option);

    expect(option.showContent).toBe(false);

    component.toggleContent(option);

    expect(option.showContent).toBe(true);
  });

  it('should toggle content', () => {
    const option = { title: 'Header', content: { type: 'header' }, showContent: true };

    component.toggleContent(option);

    expect(option.showContent).toBe(false);

    component.toggleContent(option);

    expect(option.showContent).toBe(true);
  });

});
