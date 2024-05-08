import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-geformatteerde-voorwaarden',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="geformatteerde-voorwaarden" [innerHTML]="formattedTerms"></div>
  `,
  styleUrl: './geformatteerde-voorwaarden.component.css'
})
export class GeformatteerdeVoorwaardenComponent {
  @Input() formattedTerms: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}
}
