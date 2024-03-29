  import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })

  // *** service om de kleuren die geselecteerd worden in "styling" door te geven aan het preview document *** //
  // methode accept 2 parameters : color in string formaat + klassenaam
  // zoekt DOM element met querySelector -> specifieren as HTMLElement
  // als element/klasse is gevonden : wijzig kleur van het element

  export class ColorUpdateService {

    constructor() { }
    updateBackground(color: string, elementClass: string) {
      const previewElement = document.querySelector(`.${elementClass}`) as HTMLElement;
      if (previewElement) {
        previewElement.style.backgroundColor = color;
        console.log(`Achtergrondkleur van ${elementClass} is bijgewerkt naar: ${color}`);
      } else {
        console.error(`Element met de klasse "${elementClass}" kon niet worden gevonden.`);
      }
    }
    
    updateStrongText(color: string, containerElementClass: string) {
      const containerElement = document.querySelector(`.${containerElementClass}`) as HTMLElement;
      if (containerElement) {
        const strongElements = containerElement.querySelectorAll('strong');
        strongElements.forEach((strongElement: HTMLElement) => {
          strongElement.style.color = color;
          console.log(`Tekst binnen <strong> tags in ${containerElementClass} is bijgewerkt naar: ${color}`);
        });
      } else {
        console.error(`Container element met de klasse "${containerElementClass}" kon niet worden gevonden.`);
      }
    }

    }

