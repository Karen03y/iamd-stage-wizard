import { Component } from '@angular/core';
import { OptionComponent } from "./components/option/option.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [OptionComponent]
})
export class AppComponent {
  title = 'iamd-document-wizard';
}
