import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap ,catchError,throwError} from 'rxjs';
import { RefStatus } from '../Models/RefStatus';
import { RefInventory } from '../Models/RefInventory';

@Injectable({
  providedIn: 'root'
})
export class RefServService {
  BASE_URL_REFSTATUS = "api/RefStatus";
  // ListRefStatus: RefStatus[] = [];
   constructor(private http: HttpClient) { }
   getAllRefStatus(ListRefStatus:RefStatus[]): Observable<RefStatus[]> {
    console.log("status");
    
    if (ListRefStatus.length > 0) console.log("!!!!!האובייקט כבר מלא בסטטוסים");
    
    if (ListRefStatus.length == 0) {
      return this.http.get<RefStatus[]>(this.BASE_URL_REFSTATUS).pipe(
   
        
        tap(data => console.log('סטטוסים :', data)),
        tap(data => {
          ListRefStatus = data; 
          console.log("status");
        })
      );
    }
    return of(ListRefStatus); 
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
