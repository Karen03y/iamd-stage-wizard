import { Component } from '@angular/core';
import { Footer, Header, Main, Option } from '../types';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StylingComponent } from './components/styling/styling.component';
import { HeaderComponent } from "./components/header/header.component";
import { MainComponent } from "./components/main/main.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoadContentService } from './services/load-content.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, HeaderComponent, StylingComponent, MainComponent, FooterComponent, HttpClientModule]
})
export class AppComponent {
  title = 'iamd-document-wizard';

  options: Option[] = [
    { title: "Styling", content: { type: "styling" }, showContent: true },
    { title: "Header", content: { type: "header" }, showContent: true },
    { title: "Main", content: { type: "main" }, showContent: true },
    { title: "Footer", content: { type: "footer" }, showContent: true },
  ];

  selectedHeader:Header = {content:""};
  selectedMain:Main = {content:""};
  selectedFooter:Footer = {content:""}

  constructor(private loadContentService: LoadContentService) {}

  ngOnInit() {
    this.loadDefaultContent();
  }

  loadDefaultContent() {
    this.loadContentService.loadContent('header1.html', 'header').subscribe((header: Header) => {
      this.selectedHeader = header;
    }, (error) => {
      console.error('Error loading default header content:', error);
    });

    this.loadContentService.loadContent("main1.html", "main").subscribe((main:Main)=> {
      this.selectedMain = main;
    }, (error)=>{
      console.error('Error loading default main content:', error)
    });

    this.loadContentService.loadContent('footer1.html', 'footer').subscribe((footer:Footer)=>{
      this.selectedFooter = footer;
    }, (error)=>{
      console.error('Error loading default footer content:', error)
    });
  }

  /* SHOW/HIDE CONTENT */
  toggleContent(option: Option) { 
    option.showContent = !option.showContent;
  }

  /* HEADER */
  headers: Header[] = []; 


  onHeaderChange(header: Header) {
    this.selectedHeader = header;
  }

  /* BODY */
  mains:Main[]=[];

  onMainChange(main:Main) {
    this.selectedMain = main;
  }

  /* FOOTER */
  footers:Footer[] = [];

  onFooterChange(footer:Footer) {
    this.selectedFooter = footer;
  }





  backgroundColor: string = '#FFFFFF';
  textColor: string = '#000000';

  updateColors(event: any) {
    this.backgroundColor = event.backgroundColor;
    this.textColor = event.textColor;
  }
}
