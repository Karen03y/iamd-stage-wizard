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

  verkoopfactuurMains: Main[] = [];
  aankoopfactuurMains: Main[] = [];
  offerteMains: Main[] = [];

  constructor(private loadContentService: LoadContentService, private http: HttpClient) {}

  ngOnInit() {
    this.loadMainContent();
  }

  loadMainContent() {
    const tabLabels = ['Verkoopfactuur', 'Aankoopfactuur', 'Offerte'];
  
    tabLabels.forEach((label) => {
      let folderName: 'VF' | 'AF' | 'Offertes';
      switch (label) {
        case 'Verkoopfactuur':
          folderName = 'VF';
          break;
        case 'Aankoopfactuur':
          folderName = 'AF';
          break;
        case 'Offerte':
          folderName = 'Offertes';
          break;
        default:
          return;
      }
  
      if (folderName) {
        this.loadContentService.loadAllMainContent(folderName).subscribe(
          (mains: Main[]) => {
            switch (label) {
              case 'Verkoopfactuur':
                this.verkoopfactuurMains = mains;
                break;
              case 'Aankoopfactuur':
                this.aankoopfactuurMains = mains;
                break;
              case 'Offerte':
                this.offerteMains = mains;
                break;
            }
          },
          (error) => {
            console.error(`Error loading main content for ${folderName}:`, error);
          }
        );
      }
    });
  }
  
  
  onMainChange(main: Main) {
    this.mainChange.emit(main);
  }
}
