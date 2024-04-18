import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LogoService } from '../../services/logo.service';

@Component({
  selector: 'app-logo-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-upload.component.html',
  styleUrl: './logo-upload.component.css'
})

export class LogoUploadComponent {
  imageUrl: string | undefined;

  constructor(private logoService: LogoService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.imageUrl = imageUrl;
        this.logoService.uploadLogo(imageUrl); 
      };
      reader.readAsDataURL(file);
    }
  }
}