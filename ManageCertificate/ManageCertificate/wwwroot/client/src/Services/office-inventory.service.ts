import { Injectable } from '@angular/core';
import { OfficeInventory } from '../Models/OfficeInventory';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficeInventoryService {
  BASE_URL_OFFICE_INVENTORY = "api/GetAllOfficeInventory";
  ListOfficeInventory: OfficeInventory[] = [];
  constructor(private http: HttpClient) {}
  getAllCertificate(): Observable<OfficeInventory[]> {
      console.log("getAllOfficeInventory");
      return this.http.get<OfficeInventory[]>("/GetAllOfficeInventory").pipe(
        tap(data => console.log('AllOfficeInventory :', data))
        ,tap(data => {   
           this.ListOfficeInventory = data; 
        }
        )) 
    }
}
