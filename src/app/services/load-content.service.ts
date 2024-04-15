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
    'footer': 'assets/footers/',
    'main': 'assets/mains/VF/'
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
