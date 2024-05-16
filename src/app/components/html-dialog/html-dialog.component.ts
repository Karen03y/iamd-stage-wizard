import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FontUpdateService } from '../../services/font-update.service';

@Component({
  selector: 'app-html-dialog',
  template: `
    <div class="html-dialog">
      <h2>Welke code wil je kopiëren?</h2>
      <div class="buttons">
        <button class="blue-btn" (click)="copyToClipboard(headerHtml)">Header html</button>
        <button class="blue-btn" (click)="copyToClipboard(mainHtml)">Main html</button>
        <button class="blue-btn" (click)="copyToClipboard(footerHtml)">Footer html</button>
        <button class="blue-btn" (click)="copyToClipboard(css)">CSS</button>
      </div>
      <div *ngIf="copied" class="confirmation-message" [innerHTML]="copiedMessage"></div>
    </div>
  `,
  styleUrls: ['./html-dialog.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, ClipboardModule]
})
export class HtmlDialogComponent implements OnInit {
  copied: boolean = false;
  headerHtml: string;
  mainHtml: string;
  footerHtml: string;
  fullHtml: string;
  css: string;
  copiedMessage: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private clipboard: Clipboard,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fontUpdateService: FontUpdateService 
  ) {
    this.headerHtml = data.headerHtml;
    this.mainHtml = data.mainHtml;
    this.footerHtml = data.footerHtml;
    this.fullHtml = data.fullHtml;
    this.css = this.getCssWithVariables();
    this.copiedMessage = this.sanitizer.bypassSecurityTrustHtml('');
  }

  ngOnInit(): void { }

  getCssWithVariables(): string {
    let variablesCss = ':root {\n';

    const fontFamily = this.fontUpdateService.fontFamily; 

    for (const color of this.data.colorOptions) {
      variablesCss += `  ${color.variable}: ${color.value};\n`;
    }

    variablesCss += `  --font-family: ${fontFamily};\n`; 
    variablesCss += '}\n\n'; 

    const globalStylesCss = `
    .header-doc,
    .main-doc,
    .footer-doc {
      font-family: var(--font-family);
    }

  .header-doc {
    color: var(--header-text-color);
    background-color: var(--header-background-color);
  }
  .header-doc strong {
    color: var(--header-strong-text-color);
  }
  
  .header-doc table {
    border-collapse: collapse;
    border: 1px solid var(--header-table-border-color);
  }
  
  .footer-doc {
    color: var(--footer-text-color);
    background-color: var(--footer-background-color);
  }
  .footer-doc strong {
    color: var(--footer-strong-text-color);
  }
  
  .main-doc {
    color: var(--main-text-color);
    background-color: var(--main-background-color);
  }
  
  .main-doc strong {
    color: var(--main-strong-text-color);
  }
  
  .main-doc table {
    border: var(--main-table-border-color);
  }
  
  .main-doc table th {
    background-color: var(--main-table-title-background-color);
    color: var(--main-table-title-color);
  }
    `;

    return variablesCss + globalStylesCss + this.data.css;
  }


  async copyToClipboard(html: string) {
    this.copiedMessage = this.sanitizer.bypassSecurityTrustHtml('De code werd gekopieerd naar het klembord!');
    const htmlToCopy = this.removeCSS(html);

    try {
      await this.clipboard.copy(htmlToCopy);
      this.copied = true;
      console.log(`gekopieerd`)
      setTimeout(() => (this.copied = false), 10000);
    } catch (err) {
      console.error('Failed to copy HTML: ', err);
      this.copied = false;
    }
  }

  removeCSS(html: string): string {
    return html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  }
}
