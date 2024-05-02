import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LogoUploadService {
  private logoUrlSubject = new BehaviorSubject<string>('');
  logoUrl$ = this.logoUrlSubject.asObservable();

  constructor() {}

  uploadLogo(url: string) {
    this.logoUrlSubject.next(url);
  }
}
