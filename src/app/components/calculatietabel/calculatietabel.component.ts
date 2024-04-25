import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calculatietabel } from '../../../types';
import { LoadContentService } from '../../services/load-content.service';

@Component({
  selector: 'app-calculatietabel',
  standalone: true,
  imports: [CommonModule],
  template: `
  <h1>Kies een calculatietabel</h1>
    <div class="calculatietabel" *ngFor="let calculatietabel of calculatietabellen">
    <div class="calculatietabel-content">
    <div
      class="calculatietabel-preview"
      [innerHTML]="calculatietabel.content"
      (click)="onCalculatietabelChange(calculatietabel)"
    ></div>
    </div>
    </div>
  `,
  styleUrl: './calculatietabel.component.css'
})
export class CalculatietabelComponent {

  @Output() calculatietabelChange: EventEmitter<Calculatietabel> = new EventEmitter<Calculatietabel>();

  calculatietabellen: Calculatietabel[] = [];

  constructor(private loadContentService: LoadContentService) {}

  ngOnInit() {
    this.loadCalculatietabellen();
    console.log("calculatietabel component initalized")
  }

  loadCalculatietabellen() {
    const calculatietabelFileNames = ['calculatietabel1.html', 'calculatietabel2.html']; 
    calculatietabelFileNames.forEach(fileName => {
    this.loadContentService.loadContent(fileName, 'calculatietabel').subscribe((calculatietabel: Calculatietabel) => {
      this.calculatietabellen.push(calculatietabel);
    }, error => {
      console.error(`Error loading calculatietabel content from ${fileName}:`, error);
    });
  });
}
  onCalculatietabelChange(calculatietabel:Calculatietabel) {
    this.calculatietabelChange.emit(calculatietabel)
  }
}
