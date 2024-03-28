import { Component } from '@angular/core';
import { Footer, Header, Main, Option } from '../types';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StylingComponent } from './components/styling/styling.component';
import { HeaderComponent } from "./components/header/header.component";
import { MainComponent } from "./components/main/main.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, HeaderComponent, StylingComponent, MainComponent, FooterComponent, HttpClientModule]
})
export class AppComponent {
  title = 'iamd-document-wizard';

  options: Option[] = [
    { title: "Styling", content: { type: "styling" }, showContent: true },
    { title: "Header", content: { type: "header" }, showContent: true },
    { title: "Main", content: { type: "main" }, showContent: true },
    { title: "Footer", content: { type: "footer" }, showContent: true },
  ];

  /* SHOW/HIDE CONTENT */
  toggleContent(option: Option) {
    option.showContent = !option.showContent;
  }

  /* HEADER */
  headers: Header[] = []; 
  selectedHeader:Header | undefined;

  onHeaderChange(header: Header) {
    this.selectedHeader = header;
  }

  /* BODY */
  mains:Main[]=[];
  selectedMain:Main | undefined;

  onMainChange(main:Main) {
    this.selectedMain = main;
  }

  /* FOOTER */
  footers:Footer[] = [];
  selectedFooter:Footer | undefined;

  onFooterChange(footer:Footer) {
    this.selectedFooter = footer;
  }
}
