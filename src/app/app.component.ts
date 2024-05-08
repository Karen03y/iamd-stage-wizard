import { Component, SecurityContext } from '@angular/core';
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
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { OptionButtonComponent } from "./components/option-button/option-button.component";
import { CalculatietabelComponent } from "./components/calculatietabel/calculatietabel.component";
import { LogoUploadService } from './services/logo.service';
import { FontService } from './services/font.service';
import { AlgemeneVoorwaardenComponent } from "./components/algemene-voorwaarden/algemene-voorwaarden.component";
import { GeformatteerdeVoorwaardenComponent } from "./components/geformatteerde-voorwaarden/geformatteerde-voorwaarden.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, HeaderComponent, StylingComponent, MainComponent, FooterComponent, HttpClientModule, HtmlDialogComponent, LogoUploadComponent, OptionButtonComponent, CalculatietabelComponent, AlgemeneVoorwaardenComponent, GeformatteerdeVoorwaardenComponent]
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
    { title: "Algemene Voorwaarden", content: {type: "algemene-voorwaarden"}}
  ];

    /**
   * Toggles the visibility of content based on its index.
   * @method toggleContent
   * @param {number} index - Index of the content to toggle.
   */
    selectedOptionIndex: number = -1;
    toggleContent(index: number) {
      console.log('Toggle content:', index);
      if (this.selectedOptionIndex === index) {
        this.selectedOptionIndex = -1; 
      } else {
        this.selectedOptionIndex = index; 
      }
    }

  selectedHeader:Header = {content:""};
  selectedMain:Main = {content:""};
  selectedFooter:Footer = {content:""}

  constructor(private loadContentService: LoadContentService, private colorUpdateService: ColorUpdateService, private dialog: MatDialog, private sanitizer:DomSanitizer, private logoUploadService:LogoUploadService, private fontService: FontService) {} 

  ngOnInit() {
    console.log('AppComponent initialized');
    this.loadDefaultContent();
    this.logoUploadService.logoUrl$.subscribe(url => {
      this.logoUrl = url;
      this.updatePreviewDocHeaderWithLogo(url);
    });
    this.fontService.updateDocumentFont();
  }
  
    /**
   * Sanitizes HTML content to prevent XSS attacks.
   * @method sanitizeToString
   * @param {SafeHtml} html - HTML content to be sanitized.
   * @returns {string} Sanitized HTML content.
   */
  sanitizeToString(html: SafeHtml): string {
    return this.sanitizer.sanitize(SecurityContext.HTML, html) || '';
  }

  /***************************  ***************************/
    /**
   * Loads default content for the header, main, and footer sections.
   * Logs loading and error messages.
   */
  loadDefaultContent() {
    console.log('Loading default content...');
    this.loadContentService.loadContent('header1.html', 'header').subscribe((header: Header) => {
      console.log('Default header loaded:', header);
      this.selectedHeader = header;
    }, error => {
      console.error('Error loading default header content:', error);
    });
  
    this.loadContentService.loadContent('main1.html', 'main_VF').subscribe((main: Main) => {
      console.log('Default main content loaded:', main);
      this.selectedMain = main;
    }, error => {
      console.error('Error loading default main content:', error);
    });
  
    this.loadContentService.loadContent('footer1.html', 'footer').subscribe((footer:Footer)=>{
      console.log('Default footer content loaded:', footer);
      this.selectedFooter = footer;
    }, (error)=>{
      console.error('Error loading default footer content:', error)
    });
  }

/*************************** LOGO ***************************/

/**
   * Handles the uploaded logo URL.
   * Uploads the logo using the logo upload service.
   * @method handleLogoUploaded
   * @param {string} url - URL of the uploaded logo.
   */
  
  logoUrl: string = '';

  handleLogoUploaded(url: string): void {
    console.log('Logo uploaded:', url);
    this.logoUploadService.uploadLogo(url);
  }

  updatePreviewDocHeaderWithLogo(logoUrl: string): void {
    const headerElement = document.querySelector('.preview-doc-header') as HTMLElement;
    if (headerElement) {
      let updatedContent = headerElement.innerHTML.replace(/<div class="logo">.*?<\/div>/, `<div class="logo"><img src="${logoUrl}" alt="Logo" style="max-width: 100px; max-height: 100px;"></div>`);
      headerElement.innerHTML = updatedContent;
    }
  }
  
/***************************  ***************************/

  /**
   * Event handlers for header/main/footer content change.
   * Updates the selected content.
   */
  onHeaderChange(header: Header) {
    console.log('Header changed:', header);
    this.selectedHeader = header;
    this.fontService.updateDocumentFont();
  }

  onMainChange(main:Main) {
    console.log('Main changed:', main);
    this.selectedMain = main;
    this.fontService.updateDocumentFont();
  }

  onFooterChange(footer:Footer) {
    console.log('Footer changed:', footer);
    this.selectedFooter = footer;
    this.fontService.updateDocumentFont();
  }

/*************************** COPY CODE ***************************/
/**
 * Displays an HTML dialog with dynamic content.
 * @function showHTMLDialog
 */
showDialog() {
  /** Generate full HTML content */
  const fullHtml = this.generateFullHtml();
  /** Generate CSS styles */
  const css = this.generateCSS(fullHtml);
  
  /** Open HTML dialog -> HtmlDialogComponent */
  const dialogRef = this.dialog.open(HtmlDialogComponent, {
    data: {
      headerHtml: this.generateHeaderHtml(),
      mainHtml: this.generateMainHtml(),
      footerHtml: this.generateFooterHtml(),
      fullHtml: fullHtml, 
      css: css 
    }
  });

  /** Log message when the dialog is closed */
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

/**
* Generates HTML content for the header of the dialog.
* @private
* @returns {string} HTML content for the header
*/
private generateHeaderHtml():string {
  return this.selectedHeader.content.toString()
}

/**
* Generates HTML content for the main section of the dialog.
* @private
* @returns {string} HTML content for the main section
*/
private generateMainHtml():string {
  return this.selectedMain.content.toString()
}

/**
* Generates HTML content for the footer of the dialog.
* @private
* @returns {string} HTML content for the footer
*/
private generateFooterHtml():string {
  return this.selectedFooter.content.toString()
}

/**
* Generates full HTML content by concatenating header, main, and footer HTML content.
* @private
* @returns {string} Full HTML content for the dialog
*/
private generateFullHtml(): string {
  return this.selectedHeader.content.toString() 
  + this.selectedMain.content.toString() 
  + this.selectedFooter.content.toString();
}

/**
* Extracts CSS styles from the provided HTML content.
* @private
* @param {string} html - HTML content
* @returns {string} Extracted CSS styles
*/
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

/***************** ALGEMENE VOORWAARDEN ********************/
formattedTerms: SafeHtml = '';

onFormattedTermsChange(formattedTerms: SafeHtml) {
  this.formattedTerms = this.sanitizer.bypassSecurityTrustHtml(formattedTerms.toString());
}

}