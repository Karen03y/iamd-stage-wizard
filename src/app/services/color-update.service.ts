  import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })

  // *** service om de kleuren die geselecteerd worden in "styling" door te geven aan het preview document *** //
  // methode accept 2 parameters : color in string formaat + klassenaam
  // zoekt DOM element met querySelector -> specifieren as HTMLElement
  // als element/klasse is gevonden : wijzig kleur van het element

  export class ColorUpdateService {

    updateBackground(color: string, elementClass: string) {
      const previewElement = document.querySelector(`.${elementClass}`) as HTMLElement;
      if (previewElement) {
        previewElement.style.backgroundColor = color;
        console.log(`Achtergrondkleur van ${elementClass} is bijgewerkt naar: ${color}`);
      } else {
        console.error(`Element met de klasse "${elementClass}" kon niet worden gevonden.`);
      }
    }

    updateText(color: string, elementClass: string) {
      const previewElement = document.querySelector(`.${elementClass}`) as HTMLElement;
      if (previewElement) {
        previewElement.style.color = color;
        console.log(`Kleur van ${elementClass} is bijgewerkt naar: ${color}`);
      } else {
        console.error(`Element met de klasse "${elementClass}" kon niet worden gevonden.`);
      }
    }

    updateTableTitlesBackground(color: string, tableClass: string) {
      const tableTitles = document.querySelectorAll(`.${tableClass} thead th`) as NodeListOf<HTMLElement>;
      if (tableTitles.length > 0) {
        tableTitles.forEach(title => {
          title.style.backgroundColor = color;
        });
        console.log(`Achtergrondkleur van de table title in ${tableClass} is bijgewerkt naar: ${color}`);
      } else {
        console.error(`Geen table titles gevonden met klasse "${tableClass}".`);
      }
    }

    updateTableTitlesText(color: string, tableClass: string) {
      const tableTitles = document.querySelectorAll(`.${tableClass} thead th`) as NodeListOf<HTMLElement>;
      if (tableTitles.length > 0) {
        tableTitles.forEach(title => {
          title.style.color = color;
        });
        console.log(`Kleur van de table title in ${tableClass} is bijgewerkt naar: ${color}`);
      } else {
        console.error(`Geen table titles gevonden met klasse "${tableClass}".`);
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
    
    updateTableBorder(color: string, containerClass: string) {
      const containerElements = document.querySelectorAll(`.${containerClass} table`) as NodeListOf<HTMLTableElement>;
      if (containerElements.length > 0) {
        containerElements.forEach(table => {
          table.style.borderColor = color;
        });
        console.log(`Randkleur van alle tabellen in ${containerClass} is bijgewerkt naar: ${color}`);
      } else {
        console.error(`Geen tabelelementen gevonden binnen container met de klasse "${containerClass}".`);
      }
    }
    
    }

