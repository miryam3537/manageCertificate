import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AllRequestesComponent } from '../Components/all-requestes/all-requestes.component';
import { RequestDetailsComponent } from '../Components/request-details/request-details.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AllRequestesComponent, HttpClientModule, RequestDetailsComponent, RouterOutlet,MatCardModule,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) { }
  title = "client"
  counterMinuts: number = 0
  counterSecond: number = 0
  isModalVisible = false
  setIntervalId: any
  private inactivityTime: number = 1000000; // Time in milliseconds (1 minute)
  private watingTime: number = 300000; // Time in milliseconds (5 minutes)
  private timeout: any;
  setTimeId: any;
  @HostListener('mousemove')
  @HostListener('keypress')
  onUserActivity() {
    if (!this.isModalVisible) {
      this.resetTimer();
    }
  }
  ngOnInit() {
    this.resetTimer();
  }
  resetTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.showInactivityMessage();
    }, this.inactivityTime);
  }
  private showInactivityMessage() {
    if (this.router.url === '/') return;
    const totalSeconds = Math.floor(this.watingTime / 1000); // Convert milliseconds to seconds
    this.counterMinuts = Math.floor(totalSeconds / 60); // Get whole minutes
    this.counterSecond = totalSeconds % 60; // Get remaining seconds
    this.isModalVisible = true
    this.setTimeId = setTimeout(() => {
      this.isModalVisible = false
      this.router.navigate(['/']);
    }, this.watingTime)
    this.setIntervalId = setInterval(() => {
      this.counterSecond--;
      if (this.counterSecond == -1) {
        this.counterSecond = 59;
        this.counterMinuts--
      }
    }, 1000);
  }
  exit() {
    this.isModalVisible = false
    clearTimeout(this.setTimeId);
    clearInterval(this.setIntervalId)
    this.router.navigate(['/']);
    this.resetTimer()
  }
  stay() {
    clearTimeout(this.setTimeId);
    clearInterval(this.setIntervalId)
    this.isModalVisible = false
    this.resetTimer()
  }
}









