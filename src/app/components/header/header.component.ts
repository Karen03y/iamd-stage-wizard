import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../../../types';
import { LoadContentService } from '../../services/load-content.service';

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

  constructor(private loadContentService: LoadContentService) {}

  ngOnInit() {
    this.loadHeaderContent();
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
    this.headerChange.emit(header);
  }
}
