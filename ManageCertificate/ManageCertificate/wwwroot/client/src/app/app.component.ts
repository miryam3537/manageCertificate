import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AllRequestesComponent } from '../Components/all-requestes/all-requestes.component';
import { RequestDetailsComponent } from '../Components/request-details/request-details.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule,AllRequestesComponent,RequestDetailsComponent,HttpClientModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
 
  constructor() {
   console.log("ok");
   
    
  }
  title = 'client';
}
