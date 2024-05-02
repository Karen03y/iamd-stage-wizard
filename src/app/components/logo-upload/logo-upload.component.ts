import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoUploadService } from '../../services/logo.service';

@Component({
  selector: 'app-logo-upload',
  template: `
     <h1>Upload je logo hier</h1>
    <div class="logo-upload">
      <label class="custom-file-input">
      &plus;&nbsp;&nbsp;Uploaden
      <input type="file" (change)="onFileSelected($event)" accept="image/*" />
    </label>
    <div *ngIf="!imageUrl" class="preview">Geen afbeelding geüpload</div>
    <img *ngIf="imageUrl" [src]="imageUrl" class="preview" />
  </div>
  `,
  styleUrls: ['./logo-upload.component.css'],
  standalone: true,
  imports:[CommonModule]
})
export class LogoUploadComponent {
  imageUrl: string = '';

  constructor(private logoUploadService: LogoUploadService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.logoUploadService.uploadLogo(this.imageUrl);
      };
      reader.readAsDataURL(file);
    }
  }
}