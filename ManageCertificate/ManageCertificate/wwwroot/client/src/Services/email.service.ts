import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailRequest } from '../Models/EmailRequest';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  BASE_URL_email = "api/email";
  constructor(private http: HttpClient) { }
  SentEmail(emailRequest:EmailRequest):Observable<void>{
    return this.http.post<void>(`${this.BASE_URL_email}/send`,emailRequest)
  }
}
