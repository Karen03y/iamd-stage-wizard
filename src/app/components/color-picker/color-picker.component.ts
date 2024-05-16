import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorUpdateService } from '../../services/color-update.service';
import { ColorOption } from '../../../types';

@Component({
  standalone: true,
  selector: 'app-color-picker',
  template: `
    <h2>{{ section }}</h2>
    <div *ngFor="let colorOption of colors">
      <div class="color-picker">
        <input
          type="color"
          [id]="colorOption.id"
          [(ngModel)]="colorOption.value" 
          (ngModelChange)="handleColorChange(colorOption)"
        />
        <label for="{{ colorOption.id }}">{{ colorOption.label }}</label>
      </div>
    </div>
  `,
  styleUrls: ['./color-picker.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ColorPickerComponent {
  @Input() section: string = '';
  @Input() colors: ColorOption[] = [];

  constructor(private colorUpdateService: ColorUpdateService) {}

  handleColorChange(colorOption: ColorOption) {
    this.colorUpdateService.updateStyle(colorOption);
  }
}
