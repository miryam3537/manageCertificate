import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from '../Components/test/test.component';
import { RequestDetailsComponent } from '../Components/request-details/request-details.component';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, TestComponent,RequestDetailsComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
