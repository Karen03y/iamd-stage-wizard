import { Component, EventEmitter, Output } from '@angular/core';
import { Footer, Header, Main, Option } from '../types';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { HeaderComponent } from "./components/header/header.component";
import { MainComponent } from "./components/main/main.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoadContentService } from './services/load-content.service';
import { StylingComponent } from './components/styling/styling.component';
import { ColorUpdateService } from './services/color-update.service';

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
    { title: "Main", content: { type: "main" }, showContent: true},
    { title: "Footer", content: { type: "footer" }, showContent: true },
  ];

  selectedHeader:Header = {content:""};
  selectedMain:Main = {content:""};
  selectedFooter:Footer = {content:""}

  constructor(private loadContentService: LoadContentService, private colorUpdateService: ColorUpdateService) {} 

  ngOnInit() {
    this.loadDefaultContent();
  }

  loadDefaultContent() {
    this.loadContentService.loadContent('header1.html', 'header').subscribe((header: Header) => {
      this.selectedHeader = header;
    }, error => {
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
  onHeaderChange(header: Header) {
    this.selectedHeader = header;
  }

  /* MAIN */
  onMainChange(main:Main) {
    this.selectedMain = main;
  }

  /* FOOTER */
  onFooterChange(footer:Footer) {
    this.selectedFooter = footer;
  }

  showHTML() {
    const previewDocWrapper = document.querySelector('.preview-doc-wrapper');
    if (previewDocWrapper) {
      const htmlCode = previewDocWrapper.innerHTML;
      this.showHTMLDialog(htmlCode);
    }
  }
  
  showHTMLDialog(htmlCode: string) {
    const textarea = document.createElement('textarea');
    textarea.value = htmlCode;
  
    const dialog = document.createElement('div');
    dialog.className = 'html-dialog';
    dialog.appendChild(textarea);
  
    document.body.appendChild(dialog);
  
    textarea.select();
    textarea.setSelectionRange(0, 99999);
  
    document.execCommand('copy');
  
    document.body.removeChild(dialog);
  
    alert('HTML-code is gekopieerd naar het klembord.');
  }
  

}