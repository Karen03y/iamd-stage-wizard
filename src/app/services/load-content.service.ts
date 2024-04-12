import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Header, Footer, Main } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class LoadContentService {

  private assetPaths = {
    'header': 'assets/headers/',
    'footer': 'assets/footers/'
  };

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  loadContent(fileName: string, contentType: 'header' | 'main' | 'footer', mainCategory?: string): Observable<Header | Main | Footer> {
    let contentUrl: string;

    if (contentType === 'main') {
      if (!mainCategory) {
        throw new Error('Main category must be provided when loading main content');
      }
      contentUrl = `assets/mains/${mainCategory}/${fileName}`;
    } else {
      contentUrl = `${this.assetPaths[contentType]}${fileName}`;
    }

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
