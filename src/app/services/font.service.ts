import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontService {

  selectedFont: string = ''; 

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
    }
  }
  
}
