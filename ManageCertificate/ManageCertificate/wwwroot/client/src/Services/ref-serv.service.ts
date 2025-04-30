import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { RefStatus } from '../Models/RefStatus';

@Injectable({
  providedIn: 'root'
})
export class RefServService {
  BASE_URL_REFSTATUS = "api/RefStatus";
  ListRefStatus: RefStatus[] = [];
  //private http = inject(HttpClient);
   constructor(private http: HttpClient) { }
 
   getAllRefStatus(): Observable<RefStatus[]> {
    if (this.ListRefStatus.length === 0) {
      return this.http.get<RefStatus[]>(this.BASE_URL_REFSTATUS).pipe(
        tap(data => console.log('סטטוסים :', data)),
        tap(data => {
          this.ListRefStatus = data; 
        })
      );
    }
    return of(this.ListRefStatus); // עטיפת המערך ב-Observable
  }
}
