import { Component,  Inject,  OnInit, inject } from '@angular/core';
import { TestService } from '../../Services/test.service'; 
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [TestService]
})
export class TestComponent implements OnInit {
  TestService: TestService = inject(TestService);
  List: Request[]=[];   
  ngOnInit() {
    this.TestService.getAll().subscribe((res) => {
      this.List = res;
      console.log(this.List);
    });
  }
}
