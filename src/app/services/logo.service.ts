// LogoUploadService.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoUploadService {
  private logoUrlSubject = new BehaviorSubject<string>('');
  logoUrl$ = this.logoUrlSubject.asObservable();

  constructor() {
    const storedLogoUrl = localStorage.getItem('logoUrl');
    if (storedLogoUrl) {
      this.logoUrlSubject.next(storedLogoUrl);
    }
  }

  uploadLogo(url: string) {
    this.logoUrlSubject.next(url);
    localStorage.setItem('logoUrl', url);
  }
}
