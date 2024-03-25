import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../../../types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    headers: Header[] = [
      { id: 1, headerContent: "inhoud header 1" },
      { id: 2, headerContent: "inhoud header 2" },
      { id: 3, headerContent: "inhoud header 3" }
    ];
  
    selectedHeader: Header = this.headers[0];

}
