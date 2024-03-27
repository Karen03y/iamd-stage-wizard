import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Footer } from '../../../types';
import { LoadContentService } from '../../services/load-content.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Output() footerChange: EventEmitter<Footer> = new EventEmitter<Footer>();

  footers:Footer[] = [];


constructor(private loadContentService: LoadContentService) {}

ngOnInit() {
  this.loadFooterContent();
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
