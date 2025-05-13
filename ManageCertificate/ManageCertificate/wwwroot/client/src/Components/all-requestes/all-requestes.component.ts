import { Component, OnInit, ViewChild } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RefServService } from '../../Services/ref-serv.service';
import { RequestServiceService } from '../../Services/request-service.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-requestes',
  imports: [
    RouterModule,
    MatIconModule,
    HttpClientModule,
    CommonModule,
    MatIconModule,
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
    MatSelectModule,
    MatSortModule
  ],
  templateUrl: './all-requestes.component.html',
  styleUrl: './all-requestes.component.css',
  providers: [RequestServiceService, RefServService],
})
export class AllRequestesComponent implements OnInit {
  displayedColumns: string[] = ['requestId', 'orderDate', 'deliveryMethod', 'officeComment', 'requestStatus', 'councilId', 'Actions'];
  
  ListRefStatus: RefStatus[] = [];
  
  ListRequestes = new MatTableDataSource<Requestes>([]);
  ListRefAllStatus: RefStatus[] = [];
  allRequests: Requestes[] = [];
  isLoading: boolean = true;
  isReset: boolean = false;
  @ViewChild(MatSort) sort!: MatSort; // Added MatSort

  constructor(
    public RequestServiceService: RequestServiceService,
    private RefServService: RefServService
  ) {}

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
        this.ListRequestes.data = req; 
        this.ListRequestes.sort = this.sort; 
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
    this.RequestServiceService.getAll().subscribe((res: Requestes[]) => {
      this.allRequests = res;
      this.ListRequestes.data = this.RequestServiceService.filterRequests(this.allRequests);
    });
  }
  onSelectChange(event: MatSelectChange) {
    this.RequestServiceService.selectedStatus = event.value;
    this.applyFilters();
  }

  onInputChangeCouncil(event: Event) {
    this.RequestServiceService.selectedCouncilId = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  onInputChangeNumReq(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.RequestServiceService.selectedRequestId = input ? parseInt(input, 10) : null;
    this.applyFilters();
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.RequestServiceService.selectedDate = event.value;
    this.applyFilters();
  }

  resetFilters() {
    this.RequestServiceService.selectedStatus = null;
    this.RequestServiceService.selectedCouncilId = null;
    this.RequestServiceService.selectedRequestId = null;
    this.RequestServiceService.selectedDate = null;
    this.isReset = true; 
    setTimeout(() => {
      this.isReset = false; 
    }, 0);
    this.initialData();
  }
}