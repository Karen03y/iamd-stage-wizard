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
        this.headers.push(header);
      }, error => {
        console.error(`Error loading header content from ${fileName}:`, error);
      });
    });
  }
  

  
  onHeaderChange(header: Header) {
    // Emit event wanneer header wordt gewijzigd
    this.headerChange.emit(header);
  }
}
