import { Component, EventEmitter, OnInit, Output, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../../../types';
import { LoadContentService } from '../../services/load-content.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h1>Kies een header</h1>
    <div class="header" *ngFor="let header of headers">
      <div class="header-content">
        <div
          class="header-preview"
          [innerHTML]="header.content"
          (click)="onHeaderChange(header)"
        ></div>
      </div>
    </div>`,
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit { 
  @Output() headerChange: EventEmitter<Header> = new EventEmitter<Header>();
  @Output() logoUploaded = new EventEmitter<string>(); 

  headers: Header[] = []; 

  constructor(private loadContentService: LoadContentService, private sanitizer: DomSanitizer) {} 

  ngOnInit() {
    this.loadHeaderContent();
    console.log("Header Component initialized")
  }

  loadHeaderContent() {
    const headerFileNames = ['header1.html', 'header2.html', 'header3.html']; 
      headerFileNames.forEach(fileName => {
      this.loadContentService.loadContent(fileName, 'header').subscribe((header: Header) => {
        console.log(`Header content loaded from ${fileName}:`, header);
        
        // vervang logo in nieuw logo
        const updatedHeaderContent = this.replaceLogoInHeader(header.content);
        header.content = updatedHeaderContent;
  
        // push bijgewerkte header naar lijst
        this.headers.push(header);
        console.log(`Header with updated logo:`, header);
      }, error => {
        console.error(`Error loading header content from ${fileName}:`, error);
      });
    });
  }
  
  replaceLogoInHeader(content: SafeHtml): SafeHtml {
    //haal opgeslagen logo-URL op uit lokale opslag
    const storedLogoUrl = localStorage.getItem('logoUrl');
    if (storedLogoUrl) {
      // html voor het nieuwe logo
      const logoHtml = `<img src="${storedLogoUrl}" alt="Logo" style="max-width: 100px; max-height: 80px;">`;
      
      // convert SafeHtml naar string voor bewerking
      let updatedContentString = this.sanitizer.sanitize(SecurityContext.HTML, content) || '';
      
      // manipuleer string om logo te vervangen
      updatedContentString = updatedContentString.replace(/<div class="logo">.*?<\/div>/, `<div class="logo">${logoHtml}</div>`);
      
      // convert bewerkte string terug naar SafeHtml
      const updatedContent = this.sanitizer.bypassSecurityTrustHtml(updatedContentString);
      
      // log bijgewerkte header
      console.log(`Updated header content with replaced logo:`, updatedContent);
      
      return updatedContent;
    }
    
    // geen opgeslagen logo gevonden : return originele inhoud
    return content;
  }
  
  onHeaderChange(header: Header) {
    // Emit event wanneer header wordt gewijzigd
    this.headerChange.emit(header);
  }
}
