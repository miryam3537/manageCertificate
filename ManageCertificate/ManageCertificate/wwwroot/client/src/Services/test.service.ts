import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Requestes } from '../Models/Requestes';
import { RefStatus } from '../Models/RefStatus';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  BASE_URL = "api/Requests";

  private http = inject(HttpClient);

  getAll(): Observable<Requestes[]> {
    return this.http.get<Requestes[]>(this.BASE_URL);
  }
  getAllRefStatus(): Observable<RefStatus[]> {
    return this.http.get<RefStatus[]>(this.BASE_URL);
  }

}