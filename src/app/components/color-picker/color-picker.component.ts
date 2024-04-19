import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="color-picker">
      <input
       type="color"
       class="{{ colorClass }}"
       id="{{ id }}"
       [(ngModel)]="value"
       (change)="updateColor.emit({ color: value, id: id })"
     />
    <label for="{{ id }}">{{ label }}</label>
  </div>
  `,
  styleUrl: './color-picker.component.css'
})

export class ColorPickerComponent {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() colorClass: string = '';
  @Input() value: string = '';
  @Output() updateColor = new EventEmitter<any>();
}