// Header Component
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../../../types';
import { LoadContentService } from '../../services/load-content.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LogoUploadService } from '../../services/logo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h1>Kies een header</h1>
    <div class="header" *ngFor="let header of headers">
      <div class="header-content">
        <div class="header-preview" [innerHtml]="header.content" (click)="onHeaderChange(header)">
          <div class="logo" *ngIf="logoUrl"> 
            <img [src]="logoUrl" alt="Logo" style="max-width: 100px; max-height: 100px;">
          </div>
        </div>
      </div>
    </div>`,
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit { 
  @Output() headerChange: EventEmitter<Header> = new EventEmitter<Header>();
  headers: Header[] = [];
  logoUrl: string = '';

  constructor(private loadContentService: LoadContentService, private sanitizer: DomSanitizer, private logoUploadService: LogoUploadService) {}

  ngOnInit() {
    this.loadHeaderContent();
  }

  loadHeaderContent() {
    this.loadContentService.getHeaderFileNames().subscribe((fileNames: string[]) => {
      console.log(fileNames); 
      fileNames.forEach(fileName => {
        this.loadContentService.loadContent(fileName, 'header').subscribe((header: Header) => {
          this.headers.push(header);
        }, error => {
          console.error(`Error loading header content from ${fileName}:`, error);
        });
      });
    });
  }

  onHeaderChange(header: Header) {
    this.headerChange.emit(header);
  }
}
