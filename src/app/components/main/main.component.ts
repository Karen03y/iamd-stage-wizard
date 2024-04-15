import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Main } from '../../../types';
import { LoadContentService } from '../../services/load-content.service';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTabsModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent {
  @Output() mainChange: EventEmitter<Main> = new EventEmitter<Main>();

  mains: Main[] = [];

  constructor(private loadContentService: LoadContentService, private http: HttpClient) {}

  ngOnInit() {
    this.loadMainContent();
  }

  loadMainContent() {
    const mainFileNames = ['main1.html', 'main2.html'];
    const tabLabels = ['Verkoopfactuur', 'Aankoopfactuur', 'Offerte'];
  
    tabLabels.forEach((label, index) => {
      mainFileNames.forEach((fileName) => {
        this.loadContentService.loadContent(fileName, 'main').subscribe(
          (main: Main) => {
            this.mains.push(main);
          },
          (error) => {
            console.error(`Error loading main content from ${fileName}:`, error);
          }
        );
      });
    });
  }
  
  

  getMainFolderName(tabLabel: string): string {
    switch (tabLabel) {
      case 'Verkoopfactuur':
        return 'VF';
      case 'Aankoopfactuur':
        return 'AF';
      case 'Offerte':
        return 'Offertes';
      default:
        return '';
    }
  }

  onMainChange(main: Main) {
    this.mainChange.emit(main);
  }
}
