import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable,throwError } from 'rxjs';
import { Requestes } from '../Models/Requestes';
@Injectable({
  providedIn: 'root'
})
export class RequestDetailsService {

  constructor(private http:HttpClient) { }
  
  BASE_URL = "api/Requests";
  get(id: number): Observable<Requestes> {
    return this.http.get<Requestes>(`${this.BASE_URL}/${id}`).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to fetch data'));
      })
    );
     
}

}
