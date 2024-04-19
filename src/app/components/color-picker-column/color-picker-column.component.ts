import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from "../color-picker/color-picker.component";

@Component({
    selector: 'app-color-picker-column',
    standalone: true,
    template: `
    <h2>{{ section }}</h2>
    <div *ngFor="let color of colors">
      <app-color-picker
        [id]="color.id"
        [label]="color.label"
        [colorClass]="color.class"
        [value]="color.value"
        (updateColor)="updateColor($event)"
      ></app-color-picker>
    </div>
  `,
    styleUrl: './color-picker-column.component.css',
    imports: [ColorPickerComponent, CommonModule]
})

export class ColorPickerColumnComponent {
  @Input() section: string = '';
  @Input() colors: any[] = [];
  @Output() updateColorPicker = new EventEmitter<any>();

  updateColor(data: any) {
    this.updateColorPicker.emit(data); 
  }
}