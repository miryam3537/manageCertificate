
import { RefOfficeInventory } from '../Models/RefOfficeInventory';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Certificate } from '../Models/Certificate';
import { RefCouncil } from '../Models/RefCouncil';


@Injectable({
  providedIn: 'root'
})

export class OfficeInventoryService {
  BASE_URL_OFFICE_INVENTORY = "api/GetAllOfficeInventory";
  ListOfficeInventory: RefOfficeInventory[] = [];

  constructor(private http: HttpClient) { }
  // getAllOfficeInventory(): Observable<RefOfficeInventory[]> {
  //     console.log("getAllOfficeInventory");
  //     return this.http.get<RefOfficeInventory[]>("/GetAllOfficeInventory").pipe(
  //       tap(data => console.log('AllOfficeInventory :', data))
  //       ,tap(data => {   
  //          this.ListOfficeInventory = data; 
  //       }
  //       )) 
  //   }
    
}
