import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Option } from '../../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      *ngFor="let option of options; let i = index"
      (click)="toggleOption(i)"
      [ngClass]="{ 'selected-title': selectedOptionIndex === i }"
    >
      <p>{{ option.title }}</p>
    </button>
  `,
  styleUrl: './option-button.component.css'
})
export class OptionButtonComponent {
  @Input() options: Option[] = [];
  @Output() toggle = new EventEmitter<number>();

  selectedOptionIndex: number = -1;

  toggleOption(index: number) {
    if (this.selectedOptionIndex === index) {
      this.selectedOptionIndex = -1;
    } else {
      this.selectedOptionIndex = index;
    }
    this.toggle.emit(this.selectedOptionIndex);
  }
}
