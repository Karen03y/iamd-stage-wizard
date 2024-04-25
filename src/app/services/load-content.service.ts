import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Header, Footer, Main } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class LoadContentService {

  private assetPaths = {
    'header': 'assets/headers/',
    'footer': 'assets/footers/',
    'main_VF': 'assets/mains/VF/',
    'main_AF': 'assets/mains/AF/',
    'main_Offertes': 'assets/mains/Offertes/'
  };

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  loadContent(fileName: string, contentType: 'header' | 'footer' | 'main_VF' | 'main_AF' | 'main_Offertes'): Observable<Header | Main | Footer> {
    const contentUrl = `${this.assetPaths[contentType as keyof typeof this.assetPaths]}${fileName}`;

    return this.http.get(contentUrl, { responseType: 'text' })
      .pipe(
        map(contentData => {
          const sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(contentData) as SafeHtml;

          switch (contentType) {
            case 'header':
            case 'footer':
              return { content: sanitizedContent } as Header | Footer;
            default:
              return { content: sanitizedContent } as Main;
          }
        }),
        catchError(error => {
          console.error('Failed to load content:', error);
          return throwError(new Error('Failed to load content'));
        })
      );
  }

  loadAllContent(folderName: 'VF' | 'AF' | 'Offertes', contentType: 'header' | 'footer' | 'main_VF' | 'main_AF' | 'main_Offertes'): Observable<(Header | Main | Footer)[]> {
    const mainFileNames = ['main1.html', 'main2.html']; 
    const contentObservables: Observable<Header | Main | Footer>[] = [];

    mainFileNames.forEach((fileName) => {
      const contentObservable = this.loadContent(fileName, contentType);
      contentObservables.push(contentObservable);
    });

    return forkJoin(contentObservables).pipe(
      catchError(error => {
        console.error('Failed to load all content:', error);
        return throwError(new Error('Failed to load all content'));
      })
    );
  }
}