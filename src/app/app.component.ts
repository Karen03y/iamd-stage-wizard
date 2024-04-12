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
import { HtmlDialogComponent } from './components/html-dialog/html-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LogoUploadComponent } from "./components/logo-upload/logo-upload.component"; 
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, HeaderComponent, StylingComponent, MainComponent, FooterComponent, HttpClientModule, HtmlDialogComponent, LogoUploadComponent]
})
export class AppComponent {
  title = 'iamd-document-wizard';

  options: Option[] = [
    { title: "Styling", content: { type: "styling" }, showContent: true },
    { title: "Logo", content: {type:"logo"}, showContent:true},
    { title: "Header", content: { type: "header" }, showContent: true },
    { title: "Main", content: { type: "main" }, showContent: true},
    { title: "Footer", content: { type: "footer" }, showContent: true },
  ];

  selectedHeader:Header = {content:""};
  selectedMain:Main = {content:""};
  selectedFooter:Footer = {content:""}

  constructor(private loadContentService: LoadContentService, private colorUpdateService: ColorUpdateService, private dialog: MatDialog, private sanitizer:DomSanitizer) {} 

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
  selectedOptionIndex: number = -1;

  toggleContent(index: number) {
    if (this.selectedOptionIndex === index) {
      this.selectedOptionIndex = -1; 
    } else {
      this.selectedOptionIndex = index; 
    }
  }

  /* LOGO UPLOAD */
  logoUrl: string = '';

  handleLogoUploaded(url: string): void {
    this.logoUrl = url;
    this.selectedHeader.content = `<img src="${url}" alt="Logo" style="max-width: 200px; max-height: 200px;">`;
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

  /* COPY HTML FROM PREVIEW-DOC */
  copyHeader() {
    const header = document.querySelector('.preview-doc-header');
    if (header) {
      const htmlCode = header.innerHTML;
      this.showHTMLDialog(htmlCode);
    }
  }
  
  copyMain() {
    const main = document.querySelector('.preview-doc-main');
    if (main) {
      const htmlCode = main.innerHTML;
      this.showHTMLDialog(htmlCode);
    }
  }
  
  copyFooter() {
    const footer = document.querySelector('.preview-doc-footer');
    if (footer) {
      const htmlCode = footer.innerHTML;
      this.showHTMLDialog(htmlCode);
    }
  }
  
  copyHTML() {
    const previewDocWrapper = document.querySelector('.preview-doc-wrapper');
    if (previewDocWrapper) {
      const htmlCode = previewDocWrapper.innerHTML;
      this.showHTMLDialog(htmlCode);
    }
  }
  
  showHTMLDialog(htmlCode: string) {
    console.log(htmlCode); 
    const dialogRef = this.dialog.open(HtmlDialogComponent, {
      data: { htmlCode: htmlCode }
    });
  }
}
