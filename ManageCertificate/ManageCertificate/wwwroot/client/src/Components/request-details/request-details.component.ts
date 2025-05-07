import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import{RequestDetailsService} from '../../Services/requestes.service';
import { RefServService } from '../../Services/ref-serv.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { RefInventory } from '../../Models/RefInventory';
import { Observable } from 'rxjs';
import { Requestes } from '../../Models/Requestes';
import { Certificate } from '../../Models/Certificate';
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
  ngOnInit() {
   
    this.requestDetailsService.get(this.requestId).subscribe(
     (data: any) => {
        this.requestDetails = data;
        this.dataSource.data = this.requestDetails.certificates || []; // עדכון ה-dataSource עם הנתונים שהתקבלו
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
// calculateNumberOfCertificates(certificateType: number): number { 
//   let numberOfCertificates = 0;
//   if (!this.allCertificates) {
//     console.warn('AllCertificates is undefined or empty');
//     return 0; // ערך ברירת מחדל במקרה של נתונים חסרים
//   }
//   this.allCertificates.forEach((certificate: any) => {
//     if (certificate.certificateTypeNavigation.id === certificateType) {
//       numberOfCertificates = numberOfCertificates+certificate.supllayAmount//requestAmaunt;
//     }
//   });
//   return numberOfCertificates? numberOfCertificates : 0; // החזרת מספר התעודות או 0 אם לא נמצא
// }

calculateUnusedBalance(certificate: Certificate): Observable<number> {

  return new Observable<number>((observer) => {
    const inventory = this.inventoryies?.find(
      (item: RefInventory) => item.certificateId === certificate.certificateTypeNavigation?.id && item.councilId === this.requestDetails?.council?.id
    );

    const unusedBalance =//inventory ? (inventory.inventory ?? 0) -0:0
    inventory ? (inventory.inventory ?? 0) - (certificate.used ?? 0) : 0;
    observer.next(unusedBalance);
    observer.complete();
  });
}
changeStatus(statusId: number) {
  const requestId = this.requestId;
  this.requestDetailsService.updateStatus(requestId, statusId).subscribe(
    () => {
      console.log('Status updated successfully');
      
    },
    (error) => {
      console.error('Error updating status:', error);
    }
  );
}
RequestApproval(){
  const statusId = 2; 
  this.changeStatus(statusId);
  
}
 }

