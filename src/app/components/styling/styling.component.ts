import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-styling',
  standalone: true,
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.css'],
  imports: [CommonModule, FormsModule, ColorPickerComponent, MatTabsModule, MatFormFieldModule, MatSelectModule, MatAutocompleteModule, ReactiveFormsModule, MatInputModule],
})
export class StylingComponent implements OnInit {
  @Input() selectedHeader: Header | null = null;
  @Output() updateColorPicker = new EventEmitter<any>();
  @Input() colorOptions: ColorOption[] = [];

  constructor(
    private colorUpdateService: ColorUpdateService,
    private fontUpdateService: FontUpdateService,
  ) {}

  headerColors: ColorOption[] = [];
  mainColors: ColorOption[] = [];
  footerColors: ColorOption[] = [];

  ngOnInit() {
    this.filterColorOptions();
  }

  filterColorOptions() {
    this.headerColors = this.colorOptions.filter(c => c.id.startsWith('header-'));
    this.mainColors = this.colorOptions.filter(c => c.id.startsWith('main-'));
    this.footerColors = this.colorOptions.filter(c => c.id.startsWith('footer-'));
  }

  fontList: string[] = [
    'Arial', 
    'Helvetica', 
    'Times New Roman', 
    'Verdana'
  ];

  selectedFont: string = 'Arial';

  onFontSelectionChange(font: string) {
    this.selectedFont = font;
  }

  updateFontFamily() {
    this.fontUpdateService.fontFamily = this.selectedFont; 
  }
  
}