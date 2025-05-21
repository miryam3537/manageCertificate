import { Component,inject } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import{RequestService} from '../../Services/request.service';
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
import { MatSpinner } from '@angular/material/progress-spinner';
import { signal, effect } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-request-details',
 
  imports: [MatTableModule,HttpClientModule ,CommonModule,FormsModule,MatButtonModule,MatCardModule,MatIcon,MatSpinner],
  templateUrl: './request-details.component.html',
  styleUrls:['./request-details.component.css'] ,
 providers: [RequestService,RefServService,EmailService]
})
export class RequestDetailsComponent {
  private _snackBar = inject(MatSnackBar);
  requestDetails = signal<Requestes | null>(null);
  inventories!:RefInventory[];
  displayedColumns: string[] = ['certificateTypeNavigation', 'requestAmaunt','Unused balance','supplyAmaunt','comment'];
  dataSource = new MatTableDataSource<any>([]); // אתחול למערך ריק
   requestId! :number ;
   officeEmail:string = "38215557299@mby.co.il"//יצטרך שינוי בעתיד...
   loading: boolean = false; // Flag to indicate loading state
   officeComment: string = '';
deliveredTo: string = '';

constructor(private route: ActivatedRoute,private RequestService:RequestService,private RefServService:RefServService,private EmailService:EmailService){
  // This allows effect to be set in the constructor which is within an injection context
  effect(() => {
    const details = this.requestDetails();
    if (details) {
      this.dataSource.data = details.certificates || [];
      this.officeComment = details.officeComment || '';
      this.deliveredTo = details.deliveredTo || '';
    }
  });
}

ngOnInit() {
  // Retrieve the 'id' parameter from the route
  this.route.paramMap.subscribe(params => {
    this.requestId = Number(params.get('id'));
    this.fetchRequestDetails(); // Fetch details for the specific requestId
  });
}

  private fetchRequestDetails(): void {
    // Fetch the details of the request from the service
    this.requestDetails = this.RequestService.getAll().find(r=> r.requestId == this.requestId)
    // this.RequestService.get(this.requestId).subscribe(
    //   (data: Requestes) => {
    //     this.requestDetails.set(data); // Set request details
    //     this.dataSource.data = this.requestDetails()?.certificates || []; // Update dataSource with the certificates data
    //     this.GetAllInvetory(); // Fetch inventory data
    //   },
    //   (error) => {
    //     console.error('Error fetching request details:', error); // Log any errors
    //   }
    // );
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

get requestDetailsValue() {
  return this.requestDetails() || { officeComment: '', deliveredTo: '' }; // provide default values
}
calculateUnusedBalance(certificate: Certificate): Observable<number> {
  return new Observable<number>((observer) => {
    const inventory = this.inventories?.find(
      (item: RefInventory) => item.certificateId === certificate.certificateTypeNavigation?.id && item.councilId === this.requestDetails()?.council?.id
    );
    const unusedBalance = inventory ? (inventory.inventory ?? 0) - (certificate.used ?? 0) : 0;
    observer.next(unusedBalance);
    observer.complete();
  });
}
changeStatus(statusId: number) {
  const previousStatusId = this.requestDetails()?.requestStatus ?? null; 
  this.requestDetails.update(current => ({ ...current, requestStatus: statusId } as Requestes)); // Update current status
this.upDateRequest(previousStatusId); // עדכון הסטטוס הקודם
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
    this.requestDetails()?.certificates.forEach((certificate: Certificate,index) => {
      body += `${index + 1}. ${certificate.supplyAmaunt} ${certificate.certificateTypeNavigation?.name}נשלחו ל${this.requestDetails()?.council?.name}.\n`; 
    });
  this.sentEmailToTheOffice(`אושרה בקשה מספר ${this.requestDetails()?.requestId}`,body)
}
cancelRequest(): void {
  const statusId = 4; 
  this.requestDetails()?.certificates.forEach((certificate: Certificate) => {
   certificate.supplyAmaunt = 0; 
  });
  this.changeStatus(statusId);
this.sentEmailToTheOffice(`בוטלה בקשה מספר ${this.requestDetails()?.requestId}`,`הבקשה בוטלה על ידי המשרד`)
}
readyForDelivery(): void {
  const statusId = 3; 
  this.changeStatus(statusId);
}
save(){
  this.upDateRequest(null);
}
upDateRequest(previousStatusId: number|null) {
  this.loading = true;
 if( this.checkNegitiveInventoryBalance()){
  console.log('requestDetails:', this.requestDetails);
  this.requestDetails.update(current => ({ ...current, officeComment: this.officeComment,deliveredTo:this.deliveredTo } as Requestes)); 
  this.RequestService.updateRequest( this.requestId,previousStatusId, this.requestDetails()).subscribe(
    (data:any) => {
      this.requestDetails.set(data.data); // Update the request details with the response data
      console.log('Request updated successfully:', data);
      this.loading = false;
    this.openSnackBar("הבקשה עודכנה בהצלחה", "אישור")
    //  let snackBarRef = snackBar.open('Message archived', 'Undo');
    },
    (error) => {
      console.error('Error updating status:', error);
    },
    () => this.loading = false
  );
}
}

checkNegitiveInventoryBalance(): boolean {
  let isNegitive = false;
  this.requestDetails()?.certificates.forEach((certificate: Certificate) => {
   if(certificate.supplyAmaunt ?? 0>(Number)(this.calculateUnusedBalance(certificate)))
    isNegitive = true;
   });
   if(isNegitive){
    
      if (confirm(` \n  עבור אחד או יתר מהתעודות כמות האספקה גדולה מכמות היתרה  האם אתה בטוח שברצנוך לעדכן בקשה זו?`)) {
       return true
      } else {
       return false
   }
}
return true
}

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action);
}
}
