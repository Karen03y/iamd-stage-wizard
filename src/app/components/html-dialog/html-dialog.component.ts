import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-html-dialog',
  templateUrl: './html-dialog.component.html',
  styleUrls: ['./html-dialog.component.css'],
  standalone: true,
  imports:[MatButtonModule, MatIconModule, CommonModule]
})

export class HtmlDialogComponent {
  copied: boolean = false; 
  copiedType: string = ''; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      headerCode: string,
      mainCode: string,
      footerCode: string,
      fullHtmlCode: string
    },
    public dialogRef: MatDialogRef<HtmlDialogComponent>
  ) {}
  
  copyHtmlCode(htmlCode: string, type: string) {
    const textarea = document.createElement('textarea');
    textarea.value = htmlCode;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.copiedType = type; 
    this.copied = true; 
    setTimeout(() => { 
      this.copied = false;
    }, 10000);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}




