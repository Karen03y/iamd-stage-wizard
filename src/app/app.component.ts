import { Component, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// Types
import { ColorOption, Footer, Header, Main, Option } from '../types';
import { StyleProperty } from './services/color-update.service';

// Services
import { LoadContentService } from './services/load-content.service';
import { ColorUpdateService } from './services/color-update.service';
import { LogoUploadService } from './services/logo.service';
import { FontUpdateService } from './services/font-update.service';

// Components
import { HeaderComponent } from "./components/header/header.component";
import { MainComponent } from "./components/main/main.component";
import { FooterComponent } from "./components/footer/footer.component";
import { StylingComponent } from './components/styling/styling.component';
import { HtmlDialogComponent } from './components/html-dialog/html-dialog.component';
import { LogoUploadComponent } from "./components/logo-upload/logo-upload.component";
import { OptionButtonComponent } from "./components/option-button/option-button.component";
import { CalculatietabelComponent } from "./components/calculatietabel/calculatietabel.component";
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
    { title: "Footer", content: { type: "footer" }},
    { title: "Algemene Voorwaarden", content: {type: "algemene-voorwaarden"}}
  ];

  colorOptions: ColorOption[] = [
    { id: "header-text-color", variable: "--header-text-color", value: "#000000", label: "Tekst", selector: '.header', styleProperty: StyleProperty.Color },
    { id: "header-strong-text-color", variable: "--header-strong-text-color", value: "#000000", label: "Vetgedrukte tekst", selector: '.header strong', styleProperty: StyleProperty.Color },
    { id: "header-background-color", variable: "--header-background-color", value: "#FFFFFF", label: "Achtergrond", selector: '.header', styleProperty: StyleProperty.BackgroundColor },
    
    { id: "footer-text-color", variable: "--footer-text-color", value: "#000000", label: "Tekst", selector: '.footer', styleProperty: StyleProperty.Color },
    { id: "footer-strong-text-color", variable: "--footer-strong-text-color", value: "#000000", label: "Vetgedrukte tekst", selector: '.footer strong', styleProperty: StyleProperty.Color },
    { id: "footer-background-color", variable: "--footer-background-color", value: "#FFFFFF", label: "Achtergrond", selector: '.footer', styleProperty: StyleProperty.BackgroundColor },

    { id: "main-text-color", variable: "--main-text-color", value: "#000000", label: "Tekst", selector: '.main-doc', styleProperty: StyleProperty.Color },
    { id: "main-strong-text-color", variable: "--main-strong-text-color", value: "#000000", label: "Vetgedrukte tekst", selector: '.main-doc strong', styleProperty: StyleProperty.Color },
    { id: "main-background-color", variable: "--main-background-color", value: "#FFFFFF", label: "Achtergrond", selector: '.main-doc', styleProperty: StyleProperty.BackgroundColor },
    { id: "main-table-border-color", variable: "--main-table-border-color", value: "#000000", label: "Borders", selector: '.main-doc table', styleProperty: StyleProperty.BorderColor },
    { id: "main-table-title-text-color", variable: "--main-table-title-text-color", value: "#000000", label: "Titels tekst", selector: '.main-doc th', styleProperty: StyleProperty.Color },
    { id: "main-table-title-background-color", variable: "--main-table-title-background-color", value: "#FFFFFF", label: "Titels achtergrond", selector: '.main-doc th', styleProperty: StyleProperty.BackgroundColor },    ];

    selectedHeader: Header = { content: "" };
    selectedMain: Main = { content: "" };
    selectedFooter: Footer = { content: "" };
    logoUrl: string = '';
    formattedTerms: SafeHtml = '';
    selectedOptionIndex: number = -1;  

    constructor(
      private loadContentService: LoadContentService,
      private colorUpdateService: ColorUpdateService,
      private dialog: MatDialog,
      private sanitizer: DomSanitizer,
      private logoUploadService: LogoUploadService,
      private fontUpdateService: FontUpdateService
    ) {}


  ngOnInit() {
    console.log('AppComponent initialized');
    this.loadDefaultContent();
    this.logoUploadService.logoUrl$.subscribe(url => {
        this.logoUrl = url;
        this.updatePreviewDocHeaderWithLogo(url);
      });
    this.fontUpdateService.fontFamily$.subscribe(font => {
      document.documentElement.style.setProperty('--font-family', font);      
      });
  
    this.colorUpdateService.colorChanges$.subscribe(colorOption => {
      if (colorOption) {
        document.documentElement.style.setProperty(colorOption.variable, colorOption.value);
        this.colorOptions = this.colorOptions.map(c => {
          return c.id === colorOption.id ? colorOption : c;
          });
        }});
  }

/**
 * Toggles the visibility of content based on its index.
 */
  toggleContent(index: number) {
    this.selectedOptionIndex = (this.selectedOptionIndex === index) ? -1 : index;
  }

  updateCssVariable(selector: string, styleProperty: StyleProperty, color: string) {
    const variableName = this.getCssVariableName(selector, styleProperty);
    if (variableName) {
      document.documentElement.style.setProperty(variableName, color);
    }
  }
  getCssVariableName(selector: string, styleProperty: StyleProperty): string | null {
    for (const colorOption of this.colorOptions) {
      if (colorOption.selector === selector && colorOption.styleProperty === styleProperty) {
        return colorOption.variable;
      }
    }
    return null; 
  }
  
    /**
   * Sanitizes HTML content to prevent XSS attacks.
   */
    sanitizeToString(html: SafeHtml): string {
      return this.sanitizer.sanitize(SecurityContext.HTML, html) || '';
    }
    sanitizeHtml(html: string): SafeHtml {
      return this.sanitizer.bypassSecurityTrustHtml(html);
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
  

  handleLogoUploaded(url: string): void {
    console.log('Logo uploaded:', url);
    this.logoUploadService.uploadLogo(url);
  }

  updatePreviewDocHeaderWithLogo(logoUrl: string): void {
    const headerElement = document.querySelector('.preview-doc-header') as HTMLElement;
    if (headerElement) {
      let updatedContent = headerElement.innerHTML.replace(/<div class="logo">.*?<\/div>/, 
      `<div class="logo"><img src="${logoUrl}" alt="Logo" style="max-width: 100px; max-height: 100px;"></div>`);
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
    this.fontUpdateService.fontFamily = this.fontUpdateService.fontFamily; 
  }

  onMainChange(main:Main) {
    console.log('Main changed:', main);
    this.selectedMain = main;
    this.fontUpdateService.fontFamily = this.fontUpdateService.fontFamily; 
  }

  onFooterChange(footer:Footer) {
    console.log('Footer changed:', footer);
    this.selectedFooter = footer;
    this.fontUpdateService.fontFamily = this.fontUpdateService.fontFamily; 
  }

/*************************** COPY CODE ***************************/
/**
 * Displays an HTML dialog with dynamic content.
 * @function showHTMLDialog
 */
showDialog() {
  const fullHtml = this.generateFullHtml();
  const css = this.generateCSS(fullHtml);

  /** Open HTML dialog -> HtmlDialogComponent */
  const dialogRef = this.dialog.open(HtmlDialogComponent, {
    data: {
      headerHtml: this.generateHeaderHtml(),
      mainHtml: this.generateMainHtml(),
      footerHtml: this.generateFooterHtml(),
      fullHtml,
      css,
      colorOptions: this.colorOptions,
    },
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
private generateHeaderHtml(): string {
  let headerHtml = this.selectedHeader.content.toString();
  if (this.logoUrl) {
    headerHtml = headerHtml.replace(/<div class="logo">.*?<\/div>/, `<div class="logo"><img src="${this.logoUrl}" alt="Logo" style="max-width: 100px; max-height: 100px;"></div>`);
  }
  return headerHtml;
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
  return `${this.selectedHeader.content.toString()}
          ${this.selectedMain.content.toString()}
          ${this.selectedFooter.content.toString()}`;
}

/**
 * Extracts CSS styles from the provided HTML content.
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

onFormattedTermsChange(formattedTerms: SafeHtml) {
  this.formattedTerms = formattedTerms;
}

/*********************  FONT **************************** */



}