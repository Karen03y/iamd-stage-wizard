  import { Component, OnInit } from '@angular/core';
  import {MatInputModule} from '@angular/material/input';
  import {MatFormFieldModule} from '@angular/material/form-field';
  import {MatSelectModule} from '@angular/material/select';
  import { FormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
  import {Clipboard, ClipboardModule} from '@angular/cdk/clipboard';


  @Component({
    selector: 'app-algemene-voorwaarden',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, ClipboardModule
    ],
    templateUrl: './algemene-voorwaarden.component.html',
    styleUrl: './algemene-voorwaarden.component.css'
  })
  export class AlgemeneVoorwaardenComponent implements OnInit {
    termsText: string = '';
    selectedColumns: number = 1;
    formattedTerms: SafeHtml = '';
  
    constructor(private sanitizer: DomSanitizer, private clipboard:Clipboard) { }
  
    ngOnInit(): void {
    }
  
    formatTerms(): void {
      if (!this.termsText.trim()) {
        alert('Geen tekst ingevuld.');
        return;
      }
    
      const paragraphs = this.termsText.split('\n\n');
      const columns = this.selectedColumns;
      const columnGap = '16px';
      const fontSize = '11px';
    
      let formattedText = '';
    
      formattedText += `<div class="voorwaarden" style="column-count: ${columns}; column-gap: ${columnGap}; font-size: ${fontSize}; text-align: justify; padding:16px">`;
    
      for (let i = 0; i < paragraphs.length; i++) {
        formattedText += `<li style="list-style-type:none">${paragraphs[i]}</li>`;
        if (i !== paragraphs.length - 1) {
          formattedText += '<br>'; 
        }
      }
    
      formattedText += '</div>';
    
      this.formattedTerms = this.sanitizer.bypassSecurityTrustHtml(formattedText);
    }
    
    
    copyFormattedTerms(): void {
      if (this.formattedTerms) {
        const formattedText = this.formattedTerms.toString();
        this.clipboard.copy(formattedText);
        alert('De geformatteerde voorwaarden zijn gekopieerd naar het klembord.');
      }
    }
    
  }
