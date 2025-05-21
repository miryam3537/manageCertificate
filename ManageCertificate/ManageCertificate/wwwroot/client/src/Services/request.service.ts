
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Requestes } from '../Models/Requestes';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RefStatus } from '../Models/RefStatus';
import { MatTableDataSource } from '@angular/material/table';

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
    return this.http.get<Requestes[]>(this.BASE_URL);
    
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
  
}