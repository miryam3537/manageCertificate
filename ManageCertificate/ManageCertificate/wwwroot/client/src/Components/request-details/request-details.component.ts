import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import{RequestDetailsService} from '../../Services/request-details.service';
import { RefServService } from '../../Services/ref-serv.service';
import { Requestes } from '../../Models/Requestes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { RefInventory } from '../../Models/RefInventory';
import { Observable } from 'rxjs';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-request-details',
  imports: [MatTableModule,HttpClientModule ,CommonModule],
  templateUrl: './request-details.component.html',
  styleUrls:['./request-details.component.css'] ,
 providers: [RequestDetailsService,RefServService]
})
export class RequestDetailsComponent {
  constructor(private requestDetailsService:RequestDetailsService,private RefServService:RefServService) { }
  requestDetails!: Requestes;
  inventoryies!:RefInventory[];
  displayedColumns: string[] = ['certificateTypeNavigation', 'requestAmaunt','Unused balance','supplyAmaunt','comment'];
  dataSource = new MatTableDataSource<any>([]); // אתחול למערך ריק
   requestId = 93;
   allCertificates: any[] = []; // אתחול למערך ריק
  ngOnInit() {
   
    this.requestDetailsService.get(this.requestId).subscribe(
     (data: Requestes) => {
        this.requestDetails = data;
        this.dataSource.data = this.requestDetails.certificates || []; // עדכון ה-dataSource עם הנתונים שהתקבלו
       this.allCertificates = this.requestDetails.allCertificates || []; // אתחול למערך AllCertificates
        console.log(this.requestDetails);
        this.GetAllInvetory()
      },
     (error) => {
        console.error('Error fetching request details:', error);
      }
    );
}

GetAllInvetory(): void {
  
  this.RefServService.getAllInventory().subscribe(
    (data:RefInventory[])=>{
     this.inventoryies = data
     console.log('Inventory:', this.inventoryies);
     
    })
}
calculateNumberOfCertificates(certificateType: number): number { 
  let numberOfCertificates = 0;
  if (!this.allCertificates) {
    console.warn('AllCertificates is undefined or empty');
    return 0; // ערך ברירת מחדל במקרה של נתונים חסרים
  }
  this.allCertificates.forEach((certificate: any) => {
    if (certificate.certificateTypeNavigation.id === certificateType) {
      numberOfCertificates = numberOfCertificates+certificate.supllayAmount//requestAmaunt;
    }
  });
  return numberOfCertificates? numberOfCertificates : 0; // החזרת מספר התעודות או 0 אם לא נמצא
}

calculateUnusedBalance(certificateType: number): Observable<number> {

  return new Observable<number>((observer) => {
    const inventory = this.inventoryies?.find(
      (item: RefInventory) => item.certificateId === certificateType && item.councilId === this.requestDetails?.council?.id
    );

    const unusedBalance =//inventory ? (inventory.inventory ?? 0) -0:0
    inventory ? (inventory.inventory ?? 0) - this.calculateNumberOfCertificates(certificateType) : 0;
    observer.next(unusedBalance);
    observer.complete();
  });
}
 }

