import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// *** service om de kleuren die geselecteerd worden in "styling" door te geven aan het preview document *** //
// methode accept één parameter : color in string formaat
// zoekt DOM element met querySelector -> specifieren as HTMLElement
// als element/klasse is gevonden : wijzig de achtergrondkleur van het element

export class ColorUpdateService {

  constructor() { }
  updateMainBackground(color: string) {
    const previewDocMain = document.querySelector('.preview-doc-main') as HTMLElement; 
    if (previewDocMain) {
      previewDocMain.style.backgroundColor = color; // wijzig kleur v previewDocMain
      console.log(`Achtergrondkleur van preview-doc-main is bijgewerkt naar: ${color}`);
    } else {
      console.error('Element met de klasse "preview-doc-main" kon niet worden gevonden.');
    }
  }

  updateHeaderBackground(color: string) {
    const previewDocHeader = document.querySelector('.preview-doc-header') as HTMLElement;
    if (previewDocHeader) {
      previewDocHeader.style.backgroundColor = color;
      console.log(`Achtergrondkleur van preview-doc-header is bijgewerkt naar: ${color}`);
    } else {
      console.error('Element met de klasse "preview-doc-header" kon niet worden gevonden.');
    }
  }

  updateFooterBackground(color: string) {
    const previewDocFooter = document.querySelector('.preview-doc-footer') as HTMLElement;
    if (previewDocFooter) {
      previewDocFooter.style.backgroundColor = color;
      console.log(`Achtergrondkleur van preview-doc-footer is bijgewerkt naar: ${color}`);
    } else {
      console.error('Element met de klasse "preview-doc-footer" kon niet worden gevonden.');
    }
  }
  }

