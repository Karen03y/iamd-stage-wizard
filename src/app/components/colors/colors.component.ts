import { Component } from '@angular/core';
import { NgxColorsModule } from 'ngx-colors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-colors',
  standalone:true,
  imports:[NgxColorsModule, CommonModule, FormsModule],
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent {
  colors = [
    { value: "#42A5F5" },
    { value: "#d4e157" },
    { value: "#ffb74d" }
  ].map((color, index) => ({ ...color, label: (index + 1).toString() }));

  addColor() {
    const newIndex = this.colors.length + 1;
    const newColor = { value: "#ffffff", label: newIndex.toString() };
    this.colors.push(newColor);
  }


}
