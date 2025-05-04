
import { Component, OnInit, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Requestes } from '../../Models/Requestes';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { RefStatus } from '../../Models/RefStatus';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { combineLatest } from 'rxjs';

import { RefServService } from '../../Services/ref-serv.service';
import { RequestServiceService } from '../../Services/request-service.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-all-requestes',
  imports: [ 
    MatIconModule,
    HttpClientModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCommonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,],
  templateUrl: './all-requestes.component.html',
  styleUrl: './all-requestes.component.css',
  providers: [RequestServiceService, RefServService],
})
export class AllRequestesComponent {
  displayedColumns: string[] = ['requestId', 'orderDate', 'deliveryMethod', 'officeComment','requestStatus','councilId', 'Actions'];  

constructor(
  private RequestServiceService: RequestServiceService, 
  private RefServService: RefServService 
) {} 
    
isLoading: boolean = true;
  ListRequestes: Requestes[] = [];
  ListRefStatus: RefStatus[] = [];
  selectedStatus: number | null = null;
  selectedCouncilId: string | null = null;
  selectedRequestId: number | null = null;
  selectedDate: Date | null = null;
  ListRefAllStatus: RefStatus[] = [];
  allRequests: Requestes[] = []; 
  
  ngOnInit() {
    this.initialData();
  }
  initialData() {
    this.isLoading = true; 
    combineLatest([
      this.RequestServiceService.getAll(),
      this.RefServService.getAllRefStatus(this.ListRefAllStatus)
    ]).subscribe(
      ([req, res]) => {
        this.ListRefStatus = res;
        this.ListRequestes = req;
        console.log("ListRequestes after loading:", this.ListRequestes);
        console.log("ListRefStatus after loading:", this.ListRefStatus);
        this.isLoading = false;
      },
      (error) => {
        console.error("Error loading data:", error);
        this.isLoading = false; 
      }
    );
  }
 

 

applyFilters() {
  if (this.allRequests.length > 0) {
    // אם כבר יש נתונים ב-allRequests
    this.ListRequestes = this.allRequests.filter(x => {
      const statusMatch = this.selectedStatus === null || x.requestStatusNavigation?.id === this.selectedStatus;
      const councilMatch = this.selectedCouncilId === null || 
        x.council?.name?.toLowerCase().includes(this.selectedCouncilId.toString().toLowerCase());
      const requestMatch = this.selectedRequestId === null || x.requestId === this.selectedRequestId;
      const dateMatch = !this.selectedDate || 
        (x.orderDate && new Date(x.orderDate).toDateString() === this.selectedDate.toDateString());
      return statusMatch && councilMatch && requestMatch && dateMatch;
    });
  } else {
  
    this.RequestServiceService.getAll().subscribe((res: Requestes[]) => {
      this.allRequests = res; 
      this.ListRequestes = this.allRequests.filter(x => {
        const statusMatch = this.selectedStatus === null || x.requestStatusNavigation?.id === this.selectedStatus;
        const councilMatch = this.selectedCouncilId === null || 
          x.council?.name?.toLowerCase().includes(this.selectedCouncilId.toString().toLowerCase());
        const requestMatch = this.selectedRequestId === null || x.requestId === this.selectedRequestId;
        const dateMatch = !this.selectedDate || 
          (x.orderDate && new Date(x.orderDate).toDateString() === this.selectedDate.toDateString());
        return statusMatch && councilMatch && requestMatch && dateMatch;
      });
    });
  }
}
// לחצן חיפוש שיחסוך..
onSelectChange(event: MatSelectChange) {
  this.selectedStatus = event.value; 
  this.applyFilters();
}


  onInputChangeCouncil(event: Event) {
    this.selectedCouncilId = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }



  onInputChangeNumReq(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.selectedRequestId = input ? parseInt(input, 10) : null; // Parse as number if input is not empty
    this.applyFilters();
  }
  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
    this.applyFilters();
  }

  resetFilters() {
    this.selectedStatus = null;
    this.selectedCouncilId = null;
    this.selectedRequestId = null;
    this.selectedDate = null;
    this.initialData();
  }
}
