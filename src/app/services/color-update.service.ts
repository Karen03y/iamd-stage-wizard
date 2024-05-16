import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColorOption } from '../../types';

export enum StyleProperty {
  BackgroundColor = 'backgroundColor',
  Color = 'color',
  BorderColor = 'borderColor',
}

@Injectable({
  providedIn: 'root',
})
export class ColorUpdateService {
  colorChanges$ = new BehaviorSubject<ColorOption | null>(null); 

  updateStyle(colorOption: ColorOption) {
    const elements = document.querySelectorAll(colorOption.selector) as NodeListOf<HTMLElement>;
    elements.forEach((element) => {
      element.style[colorOption.styleProperty] = colorOption.value;
    });

    this.colorChanges$.next(colorOption);
  }
}
