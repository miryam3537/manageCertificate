import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap ,catchError,throwError} from 'rxjs';
import { RefStatus } from '../Models/RefStatus';
import { RefInventory } from '../Models/RefInventory';
import { Certificate } from '../Models/Certificate';
import { RefCertificateType } from '../Models/RefCertificateType';
import { RefCouncil } from '../Models/RefCouncil';
import { RefOfficeInventory } from '../Models/RefOfficeInventory';
@Injectable({
  providedIn: 'root'
})
export class RefServService {
  ListOfficeInventory: RefOfficeInventory[] = [];
  ListCertificate: Certificate[] = [];

  BASE_URL_REFSTATUS = "api/RefStatus";
   constructor(private http: HttpClient) { }

   updateInventoryAmount(inventoryId: number, inventory: number): Observable<any> {
    const payload = { inventoryId, inventory }; // יצירת אובייקט JSON פשוט
    console.log('Sending updateInventoryAmount request:', payload);

    return this.http.put<any>('/api/updateInventoryAmount', payload).pipe(
      tap((updatedInventory) => console.log('Inventory updated successfully:', updatedInventory)),
      catchError((error) => {
        console.error('Error updating inventory:', error);
        return throwError(() => new Error('Failed to update inventory'));
      })
    );
  }
  
  updateMinimum(certificateId: number, minimum: number): Observable<any> {
    const payload = { certificateId, minimum }; // יצירת אובייקט JSON פשוט
    console.log('Sending updateminimum request:', payload);

    return this.http.put<any>('/api/updateMinimum', payload).pipe(
      tap((data) => console.log('Minimum updated successfully:',data)),
      catchError((error) => {
        console.error('Error updating Minimum:', error);
        return throwError(() => new Error('Failed to update minimum'));
      })
    );
  }
 getAllOfficeInventory(): Observable<RefOfficeInventory[]> {
  console.log("getAllOfficeInventory");
  return this.http.get<RefOfficeInventory[]>("/GetAllOfficeInventory").pipe(
    tap(data => console.log('AllOfficeInventory :', data))
    ,tap(data => {   
       this.ListOfficeInventory = data; 
    }
    )) 
}
addToOfficeInventory(RefOfficeInventory: RefOfficeInventory): Observable<RefOfficeInventory> {
  console.log("addToOfficeInventory");
  return this.http.post<RefOfficeInventory>("/api/Ref/AddOfficeInventory", RefOfficeInventory).pipe(
    tap(data => console.log('Added Office Inventory:', data)),
    catchError((error) => {
      console.error('Error:', error);
      const serverErrorMessage = error.error?.message || 'שגיאה כללית מהשרת';
      alert(`אירעה שגיאה: ${serverErrorMessage}`);
      return throwError(() => new Error(serverErrorMessage));
    })
  );
}
getAllRefCouncil(ListRefCouncil:RefCouncil[]): Observable<RefCouncil[]> {
  console.log("getAllRefCouncil");
  if(ListRefCouncil.length<=0) 
  return this.http.get<RefCouncil[]>("/GetAllRefCouncil").pipe(
    tap(data => console.log('ListRefCouncil :', data)),
    tap(data => {   
      ListRefCouncil = data; 
      console.log("ListRefCouncil-שירות");
    }
    )
  );
  else return of(ListRefCouncil);
}
// getAllOfficeInventory(ListCOuncil:RefCouncil[]): Observable<RefCouncil[]> {
//   console.log("getAllOfficeInventory");
//   return this.http.get<RefCouncil[]>("/GetAllRefCouncil").pipe(
//     tap(data => console.log('AllOfficeInventory :', data))
//     ,tap(data => {   
//       ListCOuncil = data; 
//     }
//     )) 
// }
editInventory(RefInventory: RefInventory): Observable<RefInventory> {
  console.log("editInventory");
  return this.http.put<RefInventory>("/EditInventory", RefInventory).pipe(
    tap(data => console.log('Edited Inventory:', data)),
    catchError((error) => {
      console.error('Error:', error);
      return throwError(() => new Error('Failed to edit inventory'));
    })
  );
}

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
 
  getById(concilId: number,CertificateType:number): Observable<RefInventory> {
    return this.http.get<RefInventory>(`/GetInventoryById?concilId=${concilId}&certificateId=${CertificateType}`).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to fetch data'));
      })
    );   
}

}
