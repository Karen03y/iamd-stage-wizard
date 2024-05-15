import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FontService {

  selectedFont: string = ''; 
  fontUpdated$ = new Subject<void>();

  constructor() { }

  setSelectedFont(font: string) {
    this.selectedFont = font;
    this.updateDocumentFont();
  }

  updateDocumentFont() {
    const font = this.selectedFont;
    if (font) {
      const elements = document.querySelectorAll('.preview-doc *');
      elements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.fontFamily = font;
        }
      });
      this.fontUpdated$.next(); 
    }
  }
}
