import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LogoService {

  logoUploaded = new EventEmitter<string>(); 

  constructor() {}

  uploadLogo(url: string) {
    this.logoUploaded.emit(url);
  }
}
  