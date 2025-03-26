import { Component, OnInit, inject } from '@angular/core';
import { TestService } from '../../Services/test.service'; 
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Requestes } from '../../Models/Requestes';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { RefStatus } from '../../Models/RefStatus';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [TestService]
})
export class TestComponent  {
  TestService: TestService = inject(TestService);
  List: Requestes[] = [];  
  ListRefStatus: RefStatus[] = []; 
  ngOnInit() {
    this.getAllDefult();
    this.TestService.getAllRefStatus().subscribe((res: RefStatus[]) => {
      this.ListRefStatus = res;
    });
  }
  getAllDefult() {  
    this.TestService.getAll().subscribe((res: Requestes[]) => {
      this.List = res.filter(x => x.requestStatus == 1 || x.requestStatus == 2);
      console.log(this.List); 
    });
  }
  onSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log(selectedValue);
    this.TestService.getAll().subscribe((res: Requestes[]) => {
      this.List = res.filter(x => x.requestStatus == parseInt(selectedValue));
    });
  }
  onInputChangeCouncil(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.TestService.getAll().subscribe((res: Requestes[]) => {
      this.List = res.filter(x => x.councilId == parseInt(inputValue));
    });
  }
  onInputChangeNumReq(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.TestService.getAll().subscribe((res: Requestes[]) => {
      this.List = res.filter(x => x.requestId == parseInt(inputValue));
    });
  }
  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    this.TestService.getAll().subscribe((res: Requestes[]) => {
      console.log(selectedDate);
      // this.List = res.filter(x => new Date(x.orderDate).toDateString() === selectedDate.toDateString());
    });
  }
  }