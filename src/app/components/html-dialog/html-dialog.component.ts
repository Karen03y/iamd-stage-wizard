import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-html-dialog',
  template: `
   <div class="html-dialog">
    <h2>Welke code wil je kopiëren?</h2>
      <div class="buttons">
      <button (click)="copyToClipboardWithoutCSS('header')">Header html</button>
      <button (click)="copyToClipboardWithoutCSS('main')">Main html</button>
      <button (click)="copyToClipboardWithoutCSS('footer')">Footer html</button>
      <button id="cssOnly" (click)="copyToClipboard(css)">CSS</button>
      </div>
      
      <div *ngIf="copied" class="confirmation-message">
        De code werd gekopieerd naar het klembord!
      </div>
    </div>


  `,
  styleUrls: ['./html-dialog.component.css'],
  standalone: true,
  imports:[MatButtonModule, MatIconModule, CommonModule]
})

export class HtmlDialogComponent implements OnInit {
  copied: boolean = false;
  headerHtml: string;
  mainHtml: string;
  footerHtml: string;
  fullHtml:string;
  css: string;

  constructor(
    private dialogRef: MatDialogRef<HtmlDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.headerHtml = data.headerHtml;
    this.mainHtml = data.mainHtml;
    this.footerHtml = data.footerHtml;
    this.fullHtml = data.fullHtml;
    this.css = data.css;
  }

  ngOnInit(): void {
  }

  copyToClipboard(html: string) {
    navigator.clipboard.writeText(html).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 10000); 
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  private generateHTMLWithoutCSS(html: string): string {
    const startTag = '<style>';
    const endTag = '</style>';
    let htmlWithoutCSS = html;
  
    let startIndex = htmlWithoutCSS.indexOf(startTag);
    while (startIndex !== -1) {
      const endIndex = htmlWithoutCSS.indexOf(endTag, startIndex);
  
      if (endIndex !== -1) {
        htmlWithoutCSS = htmlWithoutCSS.substring(0, startIndex) + htmlWithoutCSS.substring(endIndex + endTag.length);
        startIndex = htmlWithoutCSS.indexOf(startTag, startIndex); 
      } else {
        htmlWithoutCSS = htmlWithoutCSS.substring(0, startIndex);
        break;
      }
    }
  
    return htmlWithoutCSS.trim();
  }

  copyToClipboardWithoutCSS(section: string) {
    let htmlWithoutCSS: string ='';
    switch (section) {
      case 'header':
        htmlWithoutCSS = this.generateHTMLWithoutCSS(this.headerHtml);
        break;
      case 'main':
        htmlWithoutCSS = this.generateHTMLWithoutCSS(this.mainHtml);
        break;
      case 'footer':
        htmlWithoutCSS = this.generateHTMLWithoutCSS(this.footerHtml);
        break;
    }
    navigator.clipboard.writeText(htmlWithoutCSS).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 10000); 
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
  
  
}





