import { Component, EventEmitter, Output } from '@angular/core';
import { NgxColorsModule } from 'ngx-colors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-styling',
  standalone:true,
  imports:[NgxColorsModule, CommonModule, FormsModule],
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.css']
})
export class StylingComponent {
  selectedTab: string = 'colors';

  backgroundColor: string = '#FFFFFF';
  textColor:string= '#000000';

  @Output() colorChange: EventEmitter<any> = new EventEmitter<any>();

  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }

  /* kleuren */
  colors = [
    { value: "#000000", label: "Tekst" },
    { value: "#000000", label: "Vetgedrukte tekst" },
    { value: "#FFFFFF", label: "Achtergrond" },
    { value: "#FFFFFF", label: "Achtergrond header" },
    { value: "#FFFFFF", label: "Achtergrond footer" },
    { value: "#FFFFFF", label: "Achtergrond titels" },
];


updateColor(color: string, label: string) {
  switch(label) {
    case 'Achtergrond':
      this.backgroundColor = color;
      break;
    case 'Tekst':
      this.textColor = color;
      break;
  }
  this.colorChange.emit({
    backgroundColor: this.backgroundColor,
    textColor: this.textColor
  });
}

  /* fonts */
  availableFonts: string[] = ['Arial', 'Verdana', 'Helvetica', 'Times New Roman', 'Courier New'];
  selectedFont: string = '';
}
