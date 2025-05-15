import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap ,catchError,throwError} from 'rxjs';
import { RefStatus } from '../Models/RefStatus';
import { RefInventory } from '../Models/RefInventory';
import { Certificate } from '../Models/Certificate';
import { RefCertificateType } from '../Models/RefCertificateType';

@Injectable({
  providedIn: 'root'
})
export class RefServService {
  BASE_URL_REFSTATUS = "api/RefStatus";
   constructor(private http: HttpClient) { }
 
   getAllInventory(): Observable<RefInventory[]> {
    console.log("getAllInventory");
    return this.http.get<RefInventory[]>("/GetAllInventory");
  }
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
  getAllCertificateType(ListRefCertificateType:RefCertificateType[]): Observable<RefCertificateType[]> {
    return this.http.get<RefCertificateType[]>("/GetAllCertificateType").pipe(
      tap(data => console.log('ListRefCertificateType :', data)),
      tap(data => {   
        ListRefCertificateType = data; 
        console.log("ListRefCertificateType");
      }
      )
    );   
  }
  getAllCertificate(): Observable<Certificate[]> {
    console.log("getAllCertificate");
    return this.http.get<Certificate[]>("/GetAllCertificate").pipe(
      tap(data => console.log('AllCertificate :', data))
      // ,tap(data => {   
      //   // ListCertificate = data; 
      //   //אם אני לא ירצה לשלוף עוד פעם ועוד פעם את האובייקט הזה
      //   console.log("ListCertificate");
      // }
      // ))
    // return this.http.get<Certificate[]>("/GetAllCertificate").pipe(
    //   catchError((error) => {
    //     console.error('Error:', error);
    //     return throwError(() => new Error('Failed to fetch data'));
    //   })
      
    );   
  }
  getById(concilId: number,CertificateType:number): Observable<RefInventory> {
    return this.http.get<RefInventory>(`/GetInventoryById?concilId=${concilId}&certificateId=${CertificateType}`).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to fetch data'));
      })
    );   
}

}
