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
        const contentType = `main_${folderName}` as "main_VF" | "main_AF" | "main_Offertes"; // contentType expliciet casten
        this.loadContentService.loadAllContent(folderName, contentType).subscribe(
          (mains: Main[]) => {
            switch (label) {
              case 'Verkoopfactuur':
                this.verkoopfactuurMains.push(...mains);
                break;
              case 'Aankoopfactuur':
                this.aankoopfactuurMains.push(...mains);
                break;
              case 'Offerte':
                this.offerteMains.push(...mains);
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
