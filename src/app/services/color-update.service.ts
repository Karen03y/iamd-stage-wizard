import { Injectable } from '@angular/core';

enum StyleProperty {
  BackgroundColor = 'backgroundColor',
  Color = 'color',
  BorderColor = 'borderColor'
}

@Injectable({
  providedIn: 'root'
})
export class ColorUpdateService {

  updateStyle(color: string, selector: string, styleProperty: StyleProperty) {
    const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
    if (elements.length > 0) {
      elements.forEach(element => {
        element.style[styleProperty] = color;
      });
      console.log(`Stijl ${styleProperty} van alle elementen met selector ${selector} is bijgewerkt naar: ${color}`);
    } else {
      console.error(`Geen elementen gevonden met de selector "${selector}".`);
    }
  }

  updateBackground(color: string, elementClass: string) {
    this.updateStyle(color, `.${elementClass}`, StyleProperty.BackgroundColor);
  }

  updateText(color: string, elementClass: string) {
    this.updateStyle(color, `.${elementClass}`, StyleProperty.Color);
  }

  updateTableTitles(color: string, tableClass: string, styleProperty: StyleProperty) {
    this.updateStyle(color, `.${tableClass} thead th`, styleProperty);
  }

  updateTableTitlesBackground(color: string, tableClass: string) {
    this.updateTableTitles(color, tableClass, StyleProperty.BackgroundColor);
  }

  updateTableTitlesText(color: string, tableClass: string) {
    this.updateTableTitles(color, tableClass, StyleProperty.Color);
  }

  updateStrongText(color: string, elementClass: string) {
    this.updateStyle(color, `.${elementClass} strong`, StyleProperty.Color);
  }

  updateTableBorder(color: string, containerClass: string) {
    this.updateStyle(color, `.${containerClass} table`, StyleProperty.BorderColor);
  }

}
