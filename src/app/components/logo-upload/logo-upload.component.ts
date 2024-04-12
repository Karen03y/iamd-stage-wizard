import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-logo-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-upload.component.html',
  styleUrl: './logo-upload.component.css'
})

export class LogoUploadComponent implements OnInit {
  @Output() logoUploaded = new EventEmitter<string>(); 
  selectedImage: File | undefined;
  imageUrl: SafeUrl | string = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    console.log('LogoUploadComponent initialized');
    // Controleer of er een opgeslagen logo-URL is en gebruik deze indien beschikbaar
    const storedLogoUrl = localStorage.getItem('logoUrl');
    if (storedLogoUrl) {
      console.log('Retrieved logo URL from local storage:', storedLogoUrl);
      this.imageUrl = storedLogoUrl;
      // Geef de opgeslagen logo-URL door aan de AppComponent
      this.logoUploaded.emit(storedLogoUrl);
    }
  }

  onFileSelected(event: any): void {
    console.log('File selected:', event.target.files[0]);
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        console.log('Image URL loaded:', imageUrl);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl); 
        // Geef de URL van het geüploade logo door aan de AppComponent
        this.logoUploaded.emit(imageUrl); 
      };
      reader.readAsDataURL(file);
    }
  }
}
