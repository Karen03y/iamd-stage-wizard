import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Option } from '../../../types';
import { ColorsComponent } from "../colors/colors.component";


@Component({
    selector: 'app-option',
    standalone: true,
    templateUrl: './option.component.html',
    styleUrl: './option.component.css',
    imports: [CommonModule, FormsModule, ColorsComponent]
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


}



