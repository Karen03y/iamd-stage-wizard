import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FontUpdateService {
  private _fontFamily = 'Arial'; 
  fontFamily$ = new BehaviorSubject<string>(this._fontFamily); 
  googleFontUrl: string | null = null; 


  constructor() {
  }

  get fontFamily(): string {
    return this._fontFamily;
  }

  set fontFamily(value: string) {
    this._fontFamily = value;
    document.documentElement.style.setProperty('--font-family', value);
    this.fontFamily$.next(value);
  }

  updateDocumentFont(font: string) {
    this.fontFamily$.next(font); 

    const elements = document.querySelectorAll('.preview-doc-wrapper *'); 
    elements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.fontFamily = font;
      }
    });
  }
}
