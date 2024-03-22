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
    {title:"Kleur", content : {type:"colors"}, showContent:false},
    {title:"Header", content:{type:"header"}, showContent:true},
    {title:"Body", content:{type:"body"}, showContent:false},
    {title:"Footer", content:{type:"footer"}, showContent:false},

  ]

/* SHOW/HIDE CONTENT */
  toggleContent(option:Option) {
    option.showContent = !option.showContent;
  }

  /* HEADER */
  headers = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ];

  selectedHeader: number | undefined;

  /* BODY */
  bodies = [
    {id:1},
    {id:2},
    {id:3}
  ];
  
  selectedBody: number | undefined;

  /* FOOTER */
  footers = [
    {id:1},
    {id:2},
    {id:3}
  ];
  
  selectedFooter: number | undefined;


}



