import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Header } from '../../../types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() headerChange: EventEmitter<Header> = new EventEmitter<Header>();

  headers: Header[] = [];

  selectedHeaderId: number | undefined;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {} 

  ngOnInit() {
    this.loadHeaderContent();
  }

  loadHeaderContent() {
    this.http.get('assets/headers/header1.html', { responseType: 'text' }).subscribe(data => {
      this.headers.push({ id: 1, headerContent: this.sanitizer.bypassSecurityTrustHtml(data) });
    });
  
    this.http.get('assets/headers/header2.html', { responseType: 'text' }).subscribe(data => {
      this.headers.push({ id: 2, headerContent: this.sanitizer.bypassSecurityTrustHtml(data) });
    });
  }
  

  onHeaderChange(header: Header) {
    this.selectedHeaderId = header.id;
    this.headerChange.emit(header); 
  }
}
