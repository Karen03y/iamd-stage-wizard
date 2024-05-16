import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorUpdateService, StyleProperty } from '../../services/color-update.service';
import { ColorOption } from '../../../types';

@Component({
  standalone: true,
  selector: 'app-color-picker',
  template: `
    <h2>{{ section }}</h2>
    <div *ngFor="let color of colors">
      <div class="color-picker">
        <input
          type="color"
          [id]="color.id"
          [(ngModel)]="color.value"
          (change)="handleColorChange(color)"
        />
        <label for="{{color.id}}">{{ color.label }}</label>
      </div>
    </div>
  `,
  styleUrls: ['./color-picker.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ColorPickerComponent {
  @Input() section: string = '';
  @Input() colors: ColorOption[] = [];
  @Output() updateColorPicker = new EventEmitter<any>();

  constructor(private colorUpdateService: ColorUpdateService) {}

  handleColorChange(colorOption: ColorOption) {
    this.colorUpdateService.updateStyle(colorOption); 
  }
  
}
