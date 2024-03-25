import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Footer } from '../../../types';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Output() footerChange: EventEmitter<Footer> = new EventEmitter<Footer>();


  footers:Footer[] = [
    { id: 1, footerContent:"inhoud footer 1" },
    { id: 2, footerContent:"inhoud footer 2" },
    { id: 3, footerContent:"inhoud footer 3" }
  ];

  selectedFooter: Footer = this.footers[0];

  onFooterChange(footer: Footer) {
    this.selectedFooter = footer;
    this.footerChange.emit(footer); 
    
  }

}
