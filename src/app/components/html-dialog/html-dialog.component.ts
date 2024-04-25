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
        <button (click)="copyToClipboard(headerHtml)">Header code</button>
        <button (click)="copyToClipboard(mainHtml)">Main code</button>
        <button (click)="copyToClipboard(footerHtml)">Footer code</button>
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

  constructor(
    private dialogRef: MatDialogRef<HtmlDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.headerHtml = data.headerHtml;
    this.mainHtml = data.mainHtml;
    this.footerHtml = data.footerHtml;
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
}