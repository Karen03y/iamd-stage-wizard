import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Footer } from '../../../types';
import { LoadContentService } from '../../services/load-content.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h1>Kies een footer</h1>
    <div class="footer" *ngFor="let footer of footers">
      <div class="footer-content">
        <div
          class="footer-preview"
          [innerHTML]="footer.content"
          (click)="onFooterChange(footer)"
        ></div>
      </div>
    </div>`,
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Output() footerChange: EventEmitter<Footer> = new EventEmitter<Footer>();

  footers:Footer[] = [];

  constructor(private loadContentService: LoadContentService) {}

  ngOnInit() {
    this.loadFooterContent();
    console.log("Footer Component initiated")
  }

  loadFooterContent() {
    const footerFileNames = ['footer1.html', 'footer2.html']; 
    footerFileNames.forEach(fileName => {
    this.loadContentService.loadContent(fileName, 'footer').subscribe((footer: Footer) => {
      this.footers.push(footer);
    }, error => {
      console.error(`Error loading footer content from ${fileName}:`, error);
    });
  });
}

  onFooterChange(footer:Footer) {
    this.footerChange.emit(footer)
  }

}
