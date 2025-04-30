
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Requestes } from '../Models/Requestes';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RefStatus } from '../Models/RefStatus';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {

  BASE_URL = "api/Requests";
  BASE_URL_REFSTATUS = "api/RefStatus";
  //private http = inject(HttpClient);
   constructor(private http: HttpClient) { }

   getAll(): Observable<Requestes[]> {
    console.log("getAllrequestes!");
    return this.http.get<Requestes[]>(this.BASE_URL+'/GetAllRequest');
  
    
  }

  
}