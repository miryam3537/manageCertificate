import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
 

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
//   import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { HttpClientModule } from '@angular/common/http';

// bootstrapApplication(AppComponent, {
//   providers: [HttpClientModule], // ודא שזה מופיע כאן
// }).catch(err => console.error(err));