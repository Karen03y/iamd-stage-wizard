import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
import { ColorOption, Header } from '../../../types';
import { FontUpdateService } from '../../services/font-update.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-styling',
  standalone: true,
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.css'],
  imports: [CommonModule, FormsModule, ColorPickerComponent, MatTabsModule, MatFormFieldModule, MatSelectModule, MatAutocompleteModule, ReactiveFormsModule, MatInputModule],
})
export class StylingComponent implements OnChanges {
  @Input() selectedHeader: Header | null = null;
  @Output() updateColorPicker = new EventEmitter<any>();
  @Input() colorOptions: ColorOption[] = [];

  constructor(
    private colorUpdateService: ColorUpdateService,
    private fontUpdateService: FontUpdateService,
    private sanitizer: DomSanitizer 
    
  ) {
    this.fontList.sort();
  }

  googleFontUrl: string = '';
  googleFontImport: SafeResourceUrl | null = null;
  isLoadingFont: boolean = false; 
  fontInputError: string | null = null;

  headerColors: ColorOption[] = [];
  mainColors: ColorOption[] = [];
  footerColors: ColorOption[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['colorOptions']) {
      this.filterColorOptions();
    }
  }
  
  filterColorOptions() {
    const groupByPrefix = (colors: ColorOption[], prefix: string) =>
      colors.filter(c => c.id.startsWith(prefix));
  
    [this.headerColors, this.mainColors, this.footerColors] = [
      'header-', 'main-', 'footer-'
    ].map(prefix => groupByPrefix(this.colorOptions, prefix));
  }

  fontList: string[] = [
    'Arial', 
    'Georgia', 
    'Times New Roman', 
    'Verdana',
    'Helvetica',
    'Trebuchet MS',
    'Tahoma',
    'Garamond',
    'Monaco'
  ];

  selectedFont: string = 'Arial';

  onFontSelectionChange(font: string) {
    this.selectedFont = font;
  }

  updateFontFamily() {
    this.fontUpdateService.fontFamily = this.selectedFont; 
    this.fontUpdateService.updateDocumentFont(this.selectedFont)
  }

  addGoogleFont() {
    if (!this.isValidGoogleFontUrl(this.googleFontUrl)) {
      this.fontInputError = 'Ongeldige Google Font URL';
      return;
    }

    this.isLoadingFont = true;
    this.fontInputError = null;

    this.googleFontImport = this.sanitizer.bypassSecurityTrustResourceUrl(this.googleFontUrl);

    setTimeout(() => {
      const fontFamilyMatch = this.googleFontUrl.match(/family=([^&]+)/);
      if (fontFamilyMatch) {
        const fontFamily = fontFamilyMatch[1].replace(/\+/g, ' ');
        if (!this.fontList.includes(fontFamily)) {
          this.fontList.push(fontFamily);

          const styleElement = document.createElement('style');
          styleElement.textContent = `@import url('${this.googleFontUrl}');`;
          document.head.prepend(styleElement); 
        } else {
          this.fontInputError = 'Font bestaat al in de lijst';
        }
        this.selectedFont = fontFamily;
      } else {
        this.fontInputError = 'Kon lettertype niet uit URL halen';
      }
      this.googleFontUrl = '';
      this.isLoadingFont = false;
    }, 1000);
  }

  isValidGoogleFontUrl(url: string): boolean {
    return url.startsWith('https://fonts.googleapis.com/css2');
  }
  
}