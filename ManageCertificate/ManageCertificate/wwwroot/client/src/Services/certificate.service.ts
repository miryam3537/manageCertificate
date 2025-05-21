import { Injectable } from '@angular/core';
import { Certificate } from '../Models/Certificate';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  BASE_URL_REFSTATUS = "api/GetAllCertificate";
  ListCertificate: Certificate[] = [];
  constructor(private http: HttpClient) { }
  getAllCertificate(): Observable<Certificate[]> {
      console.log("getAllCertificate");
      return this.http.get<Certificate[]>("/GetAllCertificate").pipe(
        tap(data => console.log('AllCertificate :', data))
        ,tap(data => {   
           this.ListCertificate = data; 
        }
        )) 
    }
}
