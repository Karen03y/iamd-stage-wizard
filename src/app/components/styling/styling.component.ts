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
import { FontService } from '../../services/font.service';
import { ColorOption, Header } from '../../../types';

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
}