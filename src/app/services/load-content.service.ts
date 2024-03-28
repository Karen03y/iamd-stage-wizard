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

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  loadContent(fileName: string, contentType: 'header' | 'main' | 'footer'): Observable<Header | Main | Footer> {
    let contentUrl: string;

    switch (contentType) {
      case 'header':
        contentUrl = `assets/headers/${fileName}`;
        break;
      case 'main':
        contentUrl = `assets/mains/${fileName}`;
        break;
      case 'footer':
        contentUrl = `assets/footers/${fileName}`;
        break;
      default:
        throw new Error('Invalid content type');
    }

    return this.http.get(contentUrl, { responseType: 'text' }).pipe(
      map(contentData => {
        let sanitizedContent: SafeHtml;

        switch (contentType) {
          case 'header':
          case 'main' :
          case 'footer':
            sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(contentData);
            break;
          default:
            throw new Error('Invalid content type');
        }

        switch (contentType) {
          case 'header':
            return { content: sanitizedContent } as Header;
          case 'main' :
            return {content: sanitizedContent} as Main;
          case 'footer':
            return { content: sanitizedContent } as Footer;
          default:
            throw new Error('Invalid content type');
        }
      })
    );
  }

}
