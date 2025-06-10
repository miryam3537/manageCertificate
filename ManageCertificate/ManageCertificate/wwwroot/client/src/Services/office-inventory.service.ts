
import { OfficeInventory } from '../Models/OfficeInventory';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class OfficeInventoryService {
  BASE_URL_OFFICE_INVENTORY = "api/GetAllOfficeInventory";
  ListOfficeInventory: OfficeInventory[] = [];
  constructor(private http: HttpClient) { }
  getAllOfficeInventory(): Observable<OfficeInventory[]> {
      console.log("getAllOfficeInventory");
      return this.http.get<OfficeInventory[]>("/GetAllOfficeInventory").pipe(
        tap(data => console.log('AllOfficeInventory :', data))
        ,tap(data => {   
           this.ListOfficeInventory = data; 
        }
        )) 
    }
}
