import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { RefStatus } from '../Models/RefStatus';

@Injectable({
  providedIn: 'root'
})
export class RefServService {
  BASE_URL_REFSTATUS = "api/RefStatus";
  // ListRefStatus: RefStatus[] = [];
   constructor(private http: HttpClient) { }
   getAllRefStatus(ListRefStatus:RefStatus[]): Observable<RefStatus[]> {
    console.log("status");
    //סתם בדיקה
    //לא מבינה למה צריך אובייקט שיקלוט את הסטטוסים מתי בדיוק עוד הם נשלפים?
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
}
