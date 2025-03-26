import { Component, OnInit, inject } from '@angular/core';
import { TestService } from '../../Services/test.service'; 
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Requestes } from '../../Models/Requestes';


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [TestService]
})
export class TestComponent  {
  TestService: TestService = inject(TestService);
  List: Requestes[] = [];   
  ngOnInit() {
    this.getAll();
  }
  getAll() {  
    this.TestService.getAll().subscribe((res: Requestes[]) => {
      this.List = res;
      console.log(this.List); 
    });
  }
  onSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log(selectedValue);
    this.TestService.getAll().subscribe((res: Requestes[]) => {
      this.List = res.filter(x => x.requestStatus == parseInt(selectedValue));
      console.log(this.List); 
    });
  }
  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.TestService.getAll().subscribe((res: Requestes[]) => {
      this.List = res.filter(x => x.councilId == parseInt(inputValue));
      console.log(this.List); 
    });
  }
  }