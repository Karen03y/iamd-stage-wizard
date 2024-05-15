import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorUpdateService } from '../../services/color-update.service';
import { ColorPickerComponent } from "../color-picker/color-picker.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { Observable, debounceTime, of, switchMap, tap } from 'rxjs';
import { FontService } from '../../services/font.service';

@Component({
  selector: 'app-styling',
  standalone: true,
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.css'],
  imports: [CommonModule, FormsModule, ColorPickerComponent, MatTabsModule, MatFormFieldModule, MatSelectModule, MatAutocompleteModule, ReactiveFormsModule, MatInputModule],
})
export class StylingComponent implements OnInit{

  constructor(private colorUpdateService: ColorUpdateService, private http: HttpClient, private fontService: FontService) {}

  /****************** COLOR ********************/

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


  /****************** FONT ********************/
  fontControl = new FormControl();
  fontList: string[] = [
    'Arial',
    'Verdana',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Georgia',
    'Palatino',
    'Garamond',
    'Tahoma',
    'Trebuchet MS',
    'Open Sans',
    'Montserrat',
    'Lato',
    'Roboto Condensed',
    'Source Sans Pro',
    'Arial Black',
    'Courier',
    'Comic Sans MS',
    'Impact'
  ];
  
  ngOnInit(): void {
    this.fontList.sort((a, b) => a.localeCompare(b));
  }

  updateFont(font: string) {
    this.fontService.setSelectedFont(font);
  }
}
