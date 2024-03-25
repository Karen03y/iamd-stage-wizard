import { Component } from '@angular/core';
import { Header, Option } from '../types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorsComponent } from './components/colors/colors.component';
import { HeaderComponent } from "./components/header/header.component";
import { BodyComponent } from "./components/body/body.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, ColorsComponent, HeaderComponent, BodyComponent, FooterComponent]
})
export class AppComponent {
  title = 'iamd-document-wizard';

  options: Option[] = [
    { title: "Kleur", content: { type: "colors" }, showContent: true },
    { title: "Header", content: { type: "header" }, showContent: true },
    { title: "Body", content: { type: "body" }, showContent: true },
    { title: "Footer", content: { type: "footer" }, showContent: true },
  ];

  /* SHOW/HIDE CONTENT */
  toggleContent(option: Option) {
    option.showContent = !option.showContent;
  }
}
