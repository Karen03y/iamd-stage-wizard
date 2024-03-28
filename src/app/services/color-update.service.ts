import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorUpdateService {

  constructor() { }
  updateMainBackground(color: string) {

    const previewDocMain = document.querySelector('.preview-doc-main') as HTMLElement;
    if (previewDocMain) {
      previewDocMain.style.backgroundColor = color;
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

