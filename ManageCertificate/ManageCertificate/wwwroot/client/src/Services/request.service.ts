
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Requestes } from '../Models/Requestes';
import { tap,map } from 'rxjs/operators';
import { RefStatus } from '../Models/RefStatus';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, Observable,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  selectedStatus: number | null = null;
  selectedCouncilId: string | null = null;
  selectedRequestId: number | null = null;
  selectedDate: Date | null = null;
  allRequests: Requestes[] = [];
  BASE_URL = "api/Requests";
  BASE_URL_REFSTATUS = "api/RefStatus";
  //private http = inject(HttpClient);
   constructor(private http: HttpClient) { }

   getAll(): Observable<Requestes[]> {
    console.log("getAllrequestes!");
    return this.http.get<Requestes[]>(this.BASE_URL).pipe(tap(data => {
      this.allRequests = data;
    }));
  }
  
  getRequestById(requestId: number): Observable<Requestes | undefined> {
    return this.getAll().pipe(
      map(requestes=> requestes.find(r => r.requestId === requestId))
    );
  }
  
  filterRequests(requests: Requestes[]): Requestes[] {
    return requests.filter(x => {
      const statusMatch = this.selectedStatus === null || 
        x.requestStatusNavigation?.id === this.selectedStatus;
      const councilMatch = this.selectedCouncilId === null ||
        x.council?.name?.toLowerCase().includes(this.selectedCouncilId?.toString().toLowerCase());
      const requestMatch = this.selectedRequestId === null || 
        x.requestId === this.selectedRequestId;
      const dateMatch = !this.selectedDate ||
        (x.orderDate && new Date(x.orderDate).toDateString() === this.selectedDate.toDateString());
      return statusMatch && councilMatch && requestMatch && dateMatch;
    });
  }
  getCouncilId(requestId: number): Observable<number> {
    const url = `${this.BASE_URL}/GetCouncilId/${requestId}`;
    console.log(url,"💖😢😢🎶🎶😎🎶😎");
    return this.http.get<number>(url);

    
  }
  // getRequestByIdServer(id: number): Observable<Requestes> {
  //   return this.http.get<Requestes>(`${this.BASE_URL}/${id}`).pipe(
  //     catchError((error) => {
  //       console.error('Error:', error);
  //       return throwError(() => new Error('Failed to fetch data'));
  //     })
  //   );
    getRequestByIdServer(id: number): Observable<Requestes> {
      return this.http.get<Requestes>(`${this.BASE_URL}/${id}`).pipe(
        tap((response) => console.log('Response from server:', response)),
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => new Error('Failed to fetch data'));
        })
      );
    
    
     
}
updateRequest(requestId: number, previousStatusId: number | null, request: Requestes|null): Observable<Requestes> {
  return this.http.put<Requestes>(`${this.BASE_URL}/${requestId}`, request, {
    params: previousStatusId !== null ? { previousStatusId: previousStatusId.toString() } : undefined
  });
}
 
}