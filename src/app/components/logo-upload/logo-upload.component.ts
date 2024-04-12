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
  @Output() logoUploaded = new EventEmitter<string>(); 
  selectedImage: File | undefined;
  imageUrl: SafeUrl | string = '';

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl); 
        this.logoUploaded.emit(imageUrl); 
      };
      reader.readAsDataURL(file);
    }
  }
}
