import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Header, Footer, Main } from '../../types';

@Injectable({
  providedIn: 'root'
})

//  inladen van inhoud van versch typen vanuit assets map + maakt inhoud veilig voordat ze w weergegeven 
// constructor : inject HttpClient om verzoeken te maken om inhoud v bestanden in te laden, DomSanitizer maakt inhoud veilig
// loadContent methode : 2 parameters: filename en contentType, met switch w bepaald welke URL in te laden. Retoureneert "Observable" : bevat geladen inhoud. Gebruik .map om geladen HTML te transformeren nr SafeHTML

export class LoadContentService {

  private assetPaths = {
    'header': 'assets/headers/',
    'main': 'assets/mains/',
    'footer': 'assets/footers/'
  };

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  loadContent(fileName: string, contentType: 'header' | 'main' | 'footer'): Observable<Header | Main | Footer> {
    const contentUrl = `${this.assetPaths[contentType]}${fileName}`;

    return this.http.get(contentUrl, { responseType: 'text' }).pipe(
      map(contentData => {
        const sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(contentData) as SafeHtml;

        switch (contentType) {
          case 'header':
            return { content: sanitizedContent } as Header;
          case 'main' :
            return { content: sanitizedContent } as Main;
          case 'footer':
            return { content: sanitizedContent } as Footer;
          default:
            throw new Error('Invalid content type');
        }
      })
    );
  }
}