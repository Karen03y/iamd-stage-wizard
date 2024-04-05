import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-html-dialog',
  templateUrl: './html-dialog.component.html',
  styleUrls: ['./html-dialog.component.css'],
  standalone: true,
  imports:[MatButtonModule, MatIconModule]
})

export class HtmlDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { htmlCode: string },
    public dialogRef: MatDialogRef<HtmlDialogComponent>
  ) {}

  copyHtmlCode(htmlCode: string) {
    const textarea = document.createElement('textarea');
    textarea.value = htmlCode;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
