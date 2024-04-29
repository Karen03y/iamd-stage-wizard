import { Component, SecurityContext } from '@angular/core';
import { Calculatietabel, Footer, Header, Main, Option } from '../types';
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
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { OptionButtonComponent } from "./components/option-button/option-button.component";
import { CalculatietabelComponent } from "./components/calculatietabel/calculatietabel.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, HeaderComponent, StylingComponent, MainComponent, FooterComponent, HttpClientModule, HtmlDialogComponent, LogoUploadComponent, OptionButtonComponent, CalculatietabelComponent]
})
export class AppComponent {
  title = 'iamd-document-wizard';

  options: Option[] = [
    { title: "Styling", content: { type: "styling" } },
    { title: "Logo", content: {type:"logo"}},
    { title: "Header", content: { type: "header" }},
    { title: "Main", content: { type: "main" }},
    { title: "Calculatietabel", content: {type:"calculatietabel"}},
    { title: "Footer", content: { type: "footer" }},
  ];

  selectedHeader:Header = {content:""};
  selectedMain:Main = {content:""};
  selectedCalculatietabel:Calculatietabel = {content:""};
  selectedFooter:Footer = {content:""};

  constructor(private loadContentService: LoadContentService, private colorUpdateService: ColorUpdateService, private dialog: MatDialog, private sanitizer:DomSanitizer) {} 

  ngOnInit() {
    console.log('AppComponent initialized');
    this.loadDefaultContent();
  }

  loadDefaultContent() {
    console.log('Loading default content...');
    this.loadContentService.loadContent('header1.html', 'header').subscribe((header: Header) => {
      console.log('Default header loaded:', header);
      this.selectedHeader = header;
    }, error => {
      console.error('Error loading default header content:', error);
    });
  
    this.loadContentService.loadContent('main1.html', 'main_VF').subscribe((main: Main) => {
      console.log('Default main loaded:', main);
      this.selectedMain = main;
    }, error => {
      console.error('Error loading default main content:', error);
    });

    this.loadContentService.loadContent('calculatietabel1.html', 'calculatietabel').subscribe((calculatietabel: Calculatietabel) => {
      console.log('Default calculatietabel loaded:', calculatietabel);
      this.selectedCalculatietabel = calculatietabel;
    }, error => {
      console.error('Error loading default calculatietabel:', error);
    });
  
    this.loadContentService.loadContent('footer1.html', 'footer').subscribe((footer:Footer)=>{
      console.log('Default footer content loaded:', footer);
      this.selectedFooter = footer;
    }, (error)=>{
      console.error('Error loading default footer content:', error)
    });
  }
  

  /* SHOW/HIDE CONTENT */
  selectedOptionIndex: number = -1;

  toggleContent(index: number) {
    console.log('Toggle content:', index);
    if (this.selectedOptionIndex === index) {
      this.selectedOptionIndex = -1; 
    } else {
      this.selectedOptionIndex = index; 
    }
  }

  /* LOGO UPLOAD */
  logoUrl: string = '';

  sanitizeToString(html: SafeHtml): string {
    return this.sanitizer.sanitize(SecurityContext.HTML, html) || '';
  }
  
  handleLogoUploaded(url: string): void {
    console.log('Logo uploaded:', url);
    this.logoUrl = url;
    const logoHtml = `<img src="${url}" alt="Logo" style="max-width: 100px; max-height: 100px;">`;
  
    // Sla de logo URL op in de lokale opslag
    localStorage.setItem('logoUrl', url);
  
    // Vervang het oude logo in de header content door het nieuwe logo
    const headerContentString = this.sanitizeToString(this.selectedHeader.content);
    const updatedHeaderContentString = headerContentString.replace(/<div class="logo">.*?<\/div>/, `<div class="logo">${logoHtml}</div>`);
    this.selectedHeader.content = this.sanitizer.bypassSecurityTrustHtml(updatedHeaderContentString);
  }
  
  /* HEADER */
  onHeaderChange(header: Header) {
    console.log('Header changed:', header);
    this.selectedHeader = header;
  }

  /* MAIN */
  onMainChange(main: Main) {
    console.log('Main changed:', main);
    this.selectedMain = main;
    }
  
  
  /* CALCULATIETABEL */
  onCalculatietabelChange(calculatietabel:Calculatietabel) {
    console.log('Calculatietabel changed', calculatietabel);
    this.selectedCalculatietabel = calculatietabel;
  }

  /* FOOTER */
  onFooterChange(footer:Footer) {
    console.log('Footer changed:', footer);
    this.selectedFooter = footer;
  }

  /* SHOW DIALOG TO COPY CODE */

  showHTMLDialog() {
    const fullHtml = this.generateFullHtml();
    const css = this.generateCSS(fullHtml);
    
    const dialogRef = this.dialog.open(HtmlDialogComponent, {
      data: {
        headerHtml: this.generateHeaderHtml(),
        mainHtml: this.generateMainHtml(),
        footerHtml: this.generateFooterHtml(),
        fullHtml: fullHtml, 
        css: css 
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  

  private generateHeaderHtml():string {
    return this.selectedHeader.content.toString()
  }

  private generateMainHtml():string {
    return this.selectedMain.content.toString()
  }

  private generateFooterHtml():string {
    return this.selectedFooter.content.toString()
  }

  private generateFullHtml(): string {
    return this.selectedHeader.content.toString() 
    + this.selectedMain.content.toString() 
    + this.selectedFooter.content.toString();
  }

  private generateCSS(html: string): string {
    const startTag = '<style>';
    const endTag = '</style>';
    let css = '';
  
    let startIndex = html.indexOf(startTag);
    while (startIndex !== -1) {
      const endIndex = html.indexOf(endTag, startIndex);
      if (endIndex !== -1) {
        css += html.substring(startIndex + startTag.length, endIndex) + '\n'; 
        startIndex = html.indexOf(startTag, endIndex + endTag.length); 
      } else {
        break; 
      }
    }
    return css.trim();
  }
  
  
}