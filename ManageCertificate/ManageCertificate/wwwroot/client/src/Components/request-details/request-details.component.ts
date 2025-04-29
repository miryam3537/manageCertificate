import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import{RequestDetailsService} from '../../Services/request-details.service';
import { Requestes } from '../../Models/Requestes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
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
 providers: [RequestDetailsService]
})
export class RequestDetailsComponent {
  constructor(private requestDetailsService:RequestDetailsService) { }
  requestDetails!: Requestes;
  displayedColumns: string[] = ['certificateTypeNavigation', 'requestAmaunt','Unused balance','supplyAmaunt','comment'];
  dataSource = new MatTableDataSource<any>([]); // אתחול למערך ריק
  const requestId = 93;
  ngOnInit() {
   
    this.requestDetailsService.get(this.requestId).subscribe(
     (data: Requestes) => {
        this.requestDetails = data;
        this.dataSource.data = this.requestDetails.certificates || []; // עדכון ה-dataSource עם הנתונים שהתקבלו
        console.log(this.requestDetails);
      },
     (error) => {
        console.error('Error fetching request details:', error);
      }
    );
}


const RequestApproval=()=> {
 
    (error) => {
      console.error('Error approving request:', error);
    }
  );
}




