import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorUpdateService } from '../../services/color-update.service';
import { ColorPickerColumnComponent } from "../color-picker-column/color-picker-column.component";
import { MatTabsModule } from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-styling',
    standalone: true,
    templateUrl: './styling.component.html',
    styleUrls: ['./styling.component.css'],
    imports: [CommonModule, FormsModule, ColorPickerColumnComponent, MatTabsModule, MatFormFieldModule, MatSelectModule],
})

export class StylingComponent {

  constructor(private colorUpdateService: ColorUpdateService, private http:HttpClient) {}

  headerColors = [
    { id: "header-text", value: "#000000", label: "Tekst" },
    { id: "header-strong-text", value: "#000000", label: "Vetgedrukte tekst" },
    { id: "header-background", value: "#FFFFFF", label: "Achtergrond" }
  ];

  mainColors = [
    { id: "main-text", value: "#000000", label: "Tekst" },
    { id: "main-strong-text", value: "#000000", label: "Vetgedrukte tekst" },
    { id: "main-background", value: "#FFFFFF", label: "Achtergrond" },
    { id: "main-borders", value: "#000000", label: "Tabel borders" },
    { id: "main-titles-text", value: "#000000", label: "Tabel titels" },
    { id: "main-titles-background", value: "#FFFFFF", label: "Tabel achtergrond " }
  ];

  footerColors = [
    { id: "footer-text", value: "#000000", label: "Tekst" },
    { id: "footer-strong-text", value: "#000000", label: "Vetgedrukte tekst" },
    { id: "footer-background", value: "#FFFFFF", label: "Achtergrond" },
  ];

  updateColor(data: { color: string, id: string }) {
    const { color, id } = data; 
    switch(id) {
      case 'header-text':
        this.colorUpdateService.updateText(color, 'preview-doc-header');
        break;
      case 'header-strong-text':
        this.colorUpdateService.updateStrongText(color, 'preview-doc-header');
        break;
      case 'header-background':
        this.colorUpdateService.updateBackground(color, "preview-doc-header");
        break;
      case 'main-text':
        this.colorUpdateService.updateText(color, 'preview-doc-main');
        break;
      case 'main-strong-text':
        this.colorUpdateService.updateStrongText(color, 'preview-doc-main');
        break;
      case 'main-background':
        this.colorUpdateService.updateBackground(color, "preview-doc-main");
        break;
      case 'main-borders': 
        this.colorUpdateService.updateTableBorder(color,"preview-doc-main");
      break;
      case 'main-titles-background' :
        this.colorUpdateService.updateTableTitlesBackground(color, "preview-doc-main");
        break;
      case 'main-titles-text' : 
        this.colorUpdateService.updateTableTitlesText(color, "preview-doc-main");
        break;
      case 'footer-text':
        this.colorUpdateService.updateText(color, 'preview-doc-footer');
        break;
      case 'footer-strong-text':
        this.colorUpdateService.updateStrongText(color, 'preview-doc-footer');
        break;
      case 'footer-background':
        this.colorUpdateService.updateBackground(color, "preview-doc-footer");
        break;
      default:
        console.error(`Invalid color id: ${id}`);
    }
  }

  /****************** FONT ********************/

  fonts:string[]=[];
  selectedFont:string='';
  
    ngOnInit(): void {
      this.loadGoogleFonts();
    }

    loadGoogleFonts(): void {
      const apiKey = 'AIzaSyA9S7DY0khhn9JYcfyRWb1F6Rd2rwtF_mA';
      const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`;
      
      this.http.get<any>(url).subscribe((data: { items: { family: string }[] }) => {
        this.fonts = data.items.map(item => item.family);
    });
    }

    updateFont(): void {
    }

}