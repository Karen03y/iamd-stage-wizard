import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-logo-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-upload.component.html',
  styleUrl: './logo-upload.component.css'
})

export class LogoUploadComponent {
  @Output() imageUploaded = new EventEmitter<File>();
  selectedImage: File | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.imageUploaded.emit(file);
    }
  }

  getImageUrl(): SafeUrl | string {
    if (this.selectedImage) {
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedImage));
    }
    return '';
  }
}