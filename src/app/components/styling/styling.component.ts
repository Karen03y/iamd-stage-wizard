import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorUpdateService } from '../../services/color-update.service';

@Component({
  selector: 'app-styling',
  standalone:true,
  imports:[CommonModule, FormsModule],
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.css']
})

export class StylingComponent {
  selectedTab: string = 'colors';

  colors = [ 
 // { value: "#000000", label: "Tekst" },
  { value: "#000000", label: "Vetgedrukte tekst" }, 
  { value: "#FFFFFF", label: "Achtergrond header" },
  { value: "#FFFFFF", label: "Achtergrond main" },
  { value: "#FFFFFF", label: "Achtergrond footer" },
 //  { value: "#FFFFFF", label: "Achtergrond titels" },
];

  @Output() colorChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private colorUpdateService: ColorUpdateService) {}

  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }

  updateColor(color: string, label: string) {
    switch(label) {
      case 'Tekst':
        break;
      case 'Vetgedrukte tekst':
        this.colorUpdateService.updateStrongText(color,"preview-doc-wrapper")
        break;
      case 'Achtergrond header':  
        this.colorUpdateService.updateBackground(color, "preview-doc-header"); 
      break;
      case 'Achtergrond main' : 
        this.colorUpdateService.updateBackground(color, "preview-doc-main");
        break;
      case 'Achtergrond footer' :
        this.colorUpdateService.updateBackground(color, "preview-doc-footer");
        break;
      case 'Achtergrond titels' :
      break;
    }
  }

  /* fonts */
  availableFonts: string[] = ['Arial', 'Verdana', 'Helvetica', 'Times New Roman', 'Courier New'];
  selectedFont: string = '';
}
