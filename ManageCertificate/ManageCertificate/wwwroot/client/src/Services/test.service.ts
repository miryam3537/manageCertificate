import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  BASE_URL = "api/Test"

  private http = inject(HttpClient);


  //getAll(): Observable<any> {
  //  return this.http.get<any>(this.BASE_URL);
    getAll(): Observable <any> {
      return this.http.get<any>(this.BASE_URL);
    }
  }

