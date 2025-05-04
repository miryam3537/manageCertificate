import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap ,catchError,throwError} from 'rxjs';
import { RefStatus } from '../Models/RefStatus';
import { RefInventory } from '../Models/RefInventory';

@Injectable({
  providedIn: 'root'
})
export class RefServService {
  BASE_URL_REFSTATUS = "api";//למרים שיניתי פה....
  ListRefStatus: RefStatus[] = [];
  //private http = inject(HttpClient);
   constructor(private http: HttpClient) { }
 
   getAllRefStatus(): Observable<RefStatus[]> {
    if (this.ListRefStatus.length === 0) {
      return this.http.get<RefStatus[]>(`${this.BASE_URL_REFSTATUS}/RefStatus`).pipe(
        tap(data => console.log('סטטוסים :', data)),
        tap(data => {
          this.ListRefStatus = data; 
        })
      );
    }
    return of(this.ListRefStatus); // עטיפת המערך ב-Observable
  }
  getById(concilId: number,CertificateType:number): Observable<RefInventory> {
    return this.http.get<RefInventory>(`/GetInventoryById?concilId=${concilId}&certificateId=${CertificateType}`).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to fetch data'));
      })
    );   
}
getAllInventory(): Observable<RefInventory[]> {
  return this.http.get<RefInventory[]>("/GetAllInventory").pipe(
    catchError((error) => {
      console.error('Error:', error);
      return throwError(() => new Error('Failed to fetch data'));
    })
  );   
}
}
