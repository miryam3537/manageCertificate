import { Component, OnInit, inject } from '@angular/core';
import { TestService } from '../../Services/test.service'; 
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Requestes } from '../../Models/Requestes';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { RefStatus } from '../../Models/RefStatus';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { L } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatDatepickerModule,
    MatNativeDateModule,MatTableModule,MatIconModule, MatButtonModule,
    MatInputModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [TestService]
})
export class TestComponent  {
  displayedColumns: string[] = ['requestId', 'orderDate', 'deliveryMethod', 'officeComment','requestStatus','councilId', 'Actions'];  
  TestService: TestService = inject(TestService);
  List: Requestes[] = [];
  ListRefStatus: RefStatus[] = [];

  selectedStatus: number | null = null;
  selectedCouncilId: number | null = null;
  selectedRequestId: number | null = null;
  selectedDate: Date | null = null;

  ngOnInit() {
    this.getAllRequests();
    this.TestService.getAllRefStatus().subscribe((res: RefStatus[]) => {
      this.ListRefStatus = res;
    });
  }

  getAllRequests() {
    this.TestService.getAll().subscribe((res: Requestes[]) => {
      this.List = res;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.TestService.getAll().subscribe((res: Requestes[]) => {
      this.List = res.filter(x => {
        const statusMatch = this.selectedStatus === null || x.requestStatus === this.selectedStatus;
        const councilMatch = this.selectedCouncilId === null || x.councilId === this.selectedCouncilId;
        const requestMatch = this.selectedRequestId === null || x.requestId === this.selectedRequestId;
        const dateMatch = !this.selectedDate || (x.orderDate && new Date(x.orderDate).toDateString() === this.selectedDate.toDateString());

        return statusMatch && councilMatch && requestMatch && dateMatch;
      });
    });
  }

  onSelectChange(event: Event) {
    this.selectedStatus = parseInt((event.target as HTMLSelectElement).value);
    this.applyFilters();
  }

  onInputChangeCouncil(event: Event) {
    this.selectedCouncilId = parseInt((event.target as HTMLInputElement).value);
    this.applyFilters();
  }

  onInputChangeNumReq(event: Event) {
    this.selectedRequestId = parseInt((event.target as HTMLInputElement).value);
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
    this.getAllRequests(); // מביא את כל הבקשות מחדש
  }
}