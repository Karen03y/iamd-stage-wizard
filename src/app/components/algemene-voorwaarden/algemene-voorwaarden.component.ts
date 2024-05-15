import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-algemene-voorwaarden',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    ClipboardModule,
  ],
  templateUrl: './algemene-voorwaarden.component.html',
  styleUrl: './algemene-voorwaarden.component.css',
})
export class AlgemeneVoorwaardenComponent implements OnInit {
  @Output() formattedTermsChange = new EventEmitter<string>();
  termsText: string = '';
  selectedColumns: number = 1;
  formattedTerms: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer, private clipboard: Clipboard) {}

  ngOnInit(): void {}

  /**
   * formats terms input by user
   * choice between different column numbers
   * @returns formattedText
   */
  formatTerms(): void {
    const paragraphs = this.termsText.split('\n\n');
    const formattedParagraphs = paragraphs.map(paragraph => `<li style="list-style-type:none">${paragraph}</li>`);
    const columnWidth = 21 / this.selectedColumns; // Assuming A4 paper width is 21cm
    const columnStyle = `style="width:${columnWidth}cm;float:left;margin-right:1cm;"`;
    const formattedColumns = formattedParagraphs.map(paragraph => `<div ${columnStyle}><ul>${paragraph}</ul></div>`);
    const formattedText = formattedColumns.join('');
    this.formattedTermsChange.emit(formattedText);
  }

  /**
   * function to copy the formatted terms to clipboard
   */
  copyFormattedTerms(): void {
    if (this.formattedTerms) {
      const formattedText = this.formattedTerms.toString();
      this.clipboard.copy(formattedText);
    }
  }
}
