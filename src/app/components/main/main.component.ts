import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Main } from '../../../types';
import { LoadContentService } from '../../services/load-content.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
@Output() mainChange: EventEmitter<Main> = new EventEmitter<Main>();

mains: Main[] = [];

constructor(private loadContentService:LoadContentService) {}

ngOnInit() {
  this.loadMainContent();
}

loadMainContent() {
  const mainFileNames = ['main1.html'];

  mainFileNames.forEach(fileName=> {
    this.loadContentService.loadContent(fileName, 'main').subscribe((main:Main)=>{
      this.mains.push(main);
    }, error => {
      console.error(`Error loading main content from ${fileName}:`, error);
    });
  });
}

onMainChange(main:Main) {
  this.mainChange.emit(main);
}

}
