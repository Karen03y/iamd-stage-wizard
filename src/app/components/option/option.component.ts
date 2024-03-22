import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxColorsModule } from 'ngx-colors';
import { Option } from '../../../types';


@Component({
  selector: 'app-option',
  standalone: true,
  imports: [CommonModule, NgxColorsModule, FormsModule],
  templateUrl: './option.component.html',
  styleUrl: './option.component.css',
  
})
 

export class OptionComponent {
  options:Option[] = [
    {title:"Kleur", content : {type:"kleuren"}, showContent:true},
    {title:"Header", content:{type:"header"}, showContent:false},
    {title:"Body", content:{type:"body"}, showContent:false},
    {title:"Footer", content:{type:"footer"}, showContent:false},

  ]

/* TOGGLE CONTENT */
  toggleContent(option:Option) {
    option.showContent = !option.showContent;
  }


/* KLEUREN */
  colors = [
    { value: "#42A5F5" },
    { value: "#d4e157" },
    { value: "#ffb74d" }
  ].map((color, index) => ({ ...color, label: (index + 1).toString() }));

  addColor()  {
    const newIndex = this.colors.length+1;
    const newColor={value:"#ffffff", label:newIndex.toString()};
    this.colors.push(newColor)
  }


  
}



