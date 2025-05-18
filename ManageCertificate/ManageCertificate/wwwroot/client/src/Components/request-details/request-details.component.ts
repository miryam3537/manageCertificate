import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import{RequestDetailsService} from '../../Services/requestes.service';
import { RefServService } from '../../Services/ref-serv.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import {CommonModule} from '@angular/common';
import { RefInventory } from '../../Models/RefInventory';
import { Observable } from 'rxjs';
import { Requestes } from '../../Models/Requestes';
import { Certificate } from '../../Models/Certificate';
import { EmailService } from '../../Services/email.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-request-details',
  imports: [MatTableModule,HttpClientModule ,CommonModule,FormsModule,MatButtonModule,MatCardModule,MatIcon],
  templateUrl: './request-details.component.html',
  styleUrls:['./request-details.component.css'] ,
 providers: [RequestDetailsService,RefServService,EmailService]
})
export class RequestDetailsComponent {
  constructor(private route: ActivatedRoute,private requestDetailsService:RequestDetailsService,private RefServService:RefServService,private EmailService:EmailService) { }
  requestDetails!: Requestes;
  inventories!:RefInventory[];
  displayedColumns: string[] = ['certificateTypeNavigation', 'requestAmaunt','Unused balance','supplyAmaunt','comment'];
  dataSource = new MatTableDataSource<any>([]); // אתחול למערך ריק
   requestId! :number ;
   officeEmail:string = "38215557299@mby.co.il"//יצטרך שינוי בעתיד...
  ngOnInit() {
     // Retrieve the 'id' parameter from the route
     this.route.paramMap.subscribe(params => {
      this.requestId =Number( params.get('id'));
      this.fetchRequestDetails(); // Fetch details for the specific request
    });
  }

  private fetchRequestDetails(): void {
    // Fetch the details of the request from the service
    this.requestDetailsService.get(this.requestId).subscribe(
      (data: Requestes) => {
        this.requestDetails = data; // Set request details
        this.dataSource.data = this.requestDetails.certificates || []; // Update dataSource with the certificates data
        this.GetAllInvetory(); // Fetch inventory data
      },
      (error) => {
        console.error('Error fetching request details:', error); // Log any errors
      }
    );
  }

  private GetAllInvetory(): void {
  
  this.RefServService.getAllInventory().subscribe(
    (data:RefInventory[])=>{
     this.inventories = data
     console.log('Inventory:', this.inventories);
     
    },(error) => {
      console.error('Error fetching inventory:', error); // Log any errors
    })
}
calculateUnusedBalance(certificate: Certificate): Observable<number> {
  return new Observable<number>((observer) => {
    const inventory = this.inventories?.find(
      (item: RefInventory) => item.certificateId === certificate.certificateTypeNavigation?.id && item.councilId === this.requestDetails?.council?.id
    );
    const unusedBalance =//inventory ? (inventory.inventory ?? 0) -0:0
    inventory ? (inventory.inventory ?? 0) - (certificate.used ?? 0) : 0;
    observer.next(unusedBalance);
    observer.complete();
  });
}
changeStatus(statusId: number) {
  const previousStatusId = this.requestDetails.requestStatus?this.requestDetails.requestStatus:-1; 
this.requestDetails.requestStatus = statusId; // עדכון הסטטוס הנוכחי
console.log('requestDetails:', this.requestDetails);
  this.requestDetailsService.updateStatus( this.requestId,previousStatusId, this.requestDetails).subscribe(
    () => {
      console.log('Status updated successfully'); 
    },
    (error) => {
      console.error('Error updating status:', error);
    }
  );
}
 sentEmailToTheOffice(subject: string, body: string) {
  const emailRequest = {
    ToEmail: this.officeEmail,
    Subject: subject,
    Body: body
  };  
  this.EmailService.SentEmail(emailRequest).subscribe(
    () => {
      console.log('Email sent successfully');
    },
    (error) => {
      console.error('Error sending email:', error);
    }
  );  
 }
 requestApproval(){
  const statusId = 2; 
  this.changeStatus(statusId);
  //משתנה כמות אספקה יהיה בתחילה כמו כמות ויהיה אפשר לשנות אותו והוא ישתנה במשתנה
  var body:string = "";
    this.requestDetails.certificates.forEach((certificate: Certificate,index) => {
      body += `${index + 1}. ${certificate.supplyAmaunt} ${certificate.certificateTypeNavigation?.name}נשלחו ל${this.requestDetails?.council?.name}.\n`; 
    });
  this.sentEmailToTheOffice(` אושרה בקשה מספר ${this.requestDetails.requestId}`,body)
}
cancelRequest(): void {
  const statusId = 4; 
  this.changeStatus(statusId);
  this.requestDetails.certificates.forEach((certificate: Certificate) => {
   certificate.supplyAmaunt = 0; 
  });
this.sentEmailToTheOffice(`בוטלה בקשה מספר ${this.requestDetails.requestId}`,`הבקשה בוטלה על ידי המשרד`)
}
readyForDelivery(): void {
  const statusId = 3; 
  this.changeStatus(statusId);
}
save(){
  
}
}