import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorUpdateService, StyleProperty } from '../../services/color-update.service';

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
  @Input() colors: any[] = [];
  @Output() updateColorPicker = new EventEmitter<any>();

  constructor(private colorUpdateService: ColorUpdateService) {}

  handleColorChange(color: any) {
    const id = color.id;
    const value = color.value;
  
    switch (id) {
      case 'header-text':
        this.colorUpdateService.updateText(value, 'preview-doc-header');
        break;
      case 'header-strong-text':
        this.colorUpdateService.updateStrongText(value, 'preview-doc-header');
        break;
      case 'header-background':
        this.colorUpdateService.updateBackground(value, 'preview-doc-header');
        break;
      case 'main-text':
        this.colorUpdateService.updateText(value, 'preview-doc-main');
        break;
      case 'main-strong-text':
        this.colorUpdateService.updateStrongText(value, 'preview-doc-main');
        break;
      case 'main-background':
        this.colorUpdateService.updateBackground(value, 'preview-doc-main');
        break;
      case 'main-borders':
        this.colorUpdateService.updateTableBorder(value, 'preview-doc-main');
        break;
      case 'main-titles-background':
        this.colorUpdateService.updateTableTitlesBackground(value, 'preview-doc-main');
        break;
      case 'main-titles-text':
        this.colorUpdateService.updateTableTitlesText(value, 'preview-doc-main');
        break;
      case 'footer-text':
        this.colorUpdateService.updateText(value, 'preview-doc-footer');
        break;
      case 'footer-strong-text':
        this.colorUpdateService.updateStrongText(value, 'preview-doc-footer');
        break;
      case 'footer-background':
        this.colorUpdateService.updateBackground(value, 'preview-doc-footer');
        break;
      default:
        console.error(`Invalid color id: ${id}`);
    }
  
    this.updateColorPicker.emit({ color: value, id: id });
  }
  
}
