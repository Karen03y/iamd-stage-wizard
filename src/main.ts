import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


bootstrapApplication(AppComponent, {providers:[provideHttpClient(), importProvidersFrom(BrowserAnimationsModule), provideAnimationsAsync()]})
  .catch((err) => console.error(err));
