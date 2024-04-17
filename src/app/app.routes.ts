import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'wizard'},
    {path: 'wizard', component: AppComponent}
];
