import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, map, switchMap, toArray } from 'rxjs/operators';
import { Header, Footer, Main, Calculatietabel } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class LoadContentService {

  private assetPaths = {
    'header': 'assets/headers/',
    'footer': 'assets/footers/',
    'main_VF': 'assets/mains/VF/',
    'main_AF': 'assets/mains/AF/',
    'main_Offertes': 'assets/mains/Offertes/',
    'calculatietabel': 'assets/calculatietabel/'
  };

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  loadContent(fileName: string, contentType: 'header' | 'footer' | 'main_VF' | 'main_AF' | 'main_Offertes' | 'calculatietabel'): Observable<Header | Main | Footer | Calculatietabel> {
    const contentUrl = `${this.assetPaths[contentType as keyof typeof this.assetPaths]}${fileName}`;

    return this.http.get(contentUrl, { responseType: 'text' })
      .pipe(
        map(contentData => ({ content: this.sanitizeContent(contentData) })),
        catchError(error => {
          console.error('Failed to load content:', error);
          return throwError(new Error('Failed to load content'));
        })
      );
  }

  loadAllContent(folderName: string, contentType: 'header' | 'footer' | 'main_VF' | 'main_AF' | 'main_Offertes' | 'calculatietabel'): Observable<(Header | Main | Footer | Calculatietabel)[]> {
    const fileNamesUrl = `assets/fileNames.json`;

    return this.http.get<any>(fileNamesUrl)
      .pipe(
        switchMap(data => {
          const fileNames = data[folderName];
          if (!fileNames) {
            throw new Error('Folder not found');
          }

          const contentObservables: Observable<Header | Main | Footer | Calculatietabel>[] = fileNames.map((fileName: string) => {
            return this.loadContent(fileName, contentType);
          });

          return forkJoin(contentObservables).pipe(
            map(contents => contents as (Header | Main | Footer | Calculatietabel)[])
          );
        }),
        catchError(error => {
          console.error('Failed to load all content:', error);
          return throwError(new Error('Failed to load all content'));
        })
      );
  }
  getHeaderFileNames(): Observable<string[]> {
    const fileNamesUrl = 'assets/fileNames.json';
    return this.http.get<any>(fileNamesUrl).pipe(
      map(data => {
        return data['headers'] || []; // We halen alleen de array met bestandsnamen voor de headers op, of een lege array als het niet bestaat
      }),
      catchError(error => {
        console.error('Failed to load header file names:', error);
        return throwError(new Error('Failed to load header file names'));
      })
    );
  }
  

  private sanitizeContent(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
