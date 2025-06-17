import { Component,inject } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import{RequestService} from '../../Services/request.service';
import { RefServService } from '../../Services/ref-serv.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import {CommonModule} from '@angular/common';
import { RefInventory } from '../../Models/RefInventory';
import { from, Observable } from 'rxjs';
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
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-request-details',
 
  imports: [MatTableModule,HttpClientModule ,CommonModule,FormsModule,MatButtonModule,MatCardModule,MatIcon,MatSpinner,ReactiveFormsModule],
  templateUrl: './request-details.component.html',
  styleUrls:['./request-details.component.css'] ,
 providers: [RequestService,RefServService,EmailService]
})
export class RequestDetailsComponent {
  private _snackBar = inject(MatSnackBar);
  form: FormGroup;
  requestDetails = signal<Requestes | null>(null);
  inventories!:RefInventory[];
  displayedColumns: string[] = ['certificateTypeNavigation', 'requestAmaunt','Unused balance','supplyAmaunt','comment'];
  dataSource = new MatTableDataSource<any>([]); // אתחול למערך ריק
   requestId! :number ;
   officeEmail:string = "38215557299@mby.co.il"//יצטרך שינוי בעתיד...
   loading: boolean = false; // Flag to indicate loading state
isRequestApproved: boolean = false;
isDeliveredToInvalid: boolean = false;
constructor(
  private route: ActivatedRoute,
  private RequestService:RequestService,
  private RefServService:RefServService,
  private EmailService:EmailService)
  {
  // This allows effect to be set in the constructor which is within an injection context
  this.form = new FormGroup({
    deliveredTo: new FormControl(''), // Delivered To field
    officeComment: new FormControl(''), // Office Comment field
    rows: new FormArray([]), // FormArray for table rows
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
  this.RequestService.getRequestById(this.requestId).subscribe(request => {
    console.log('Fetched Request:', request);

    this.requestDetails.set(request ?? null);

    // Use the `request` object directly to set `isRequestApproved`
   this.initialRequest()
  });
}
initialRequest(){
  this.isRequestApproved = this.requestDetails()?.requestStatus === 2; // Check if the request is approved
  // Update the form fields
  this.form.get('deliveredTo')?.setValue(this.requestDetails()?.deliveredTo || '');
  this.form.get('officeComment')?.setValue(this.requestDetails()?.officeComment || '');

  // Enable/Disable fields based on approval status
  if (this.isRequestApproved) {
    this.form.get('deliveredTo')?.disable();
  } else {
    this.form.get('deliveredTo')?.enable();
  }
  const deliveredToControl = this.form.get('deliveredTo');
if (!this.requestDetails()?.address) {
  deliveredToControl?.setValidators(Validators.required); // Add required validator
} else {
  deliveredToControl?.clearValidators(); // Remove all validators
}
deliveredToControl?.updateValueAndValidity(); // Ensure the validation state is updated
  // Initialize the table rows
  console.log('this.requestApproval:', this.isRequestApproved
  
  );
  
  this.initializeRows(this.requestDetails()?.certificates || []);
}
private initializeRows(certificates: Certificate[]): void {
  const rows = this.form.get('rows') as FormArray;
  rows.clear(); // Clear existing rows

  certificates.forEach((certificate) => {
    rows.push(
      new FormGroup({
        supplyAmaunt: new FormControl(
          { value: certificate.supplyAmaunt ?? certificate.requestAmaunt, disabled: this.isRequestApproved },
          Validators.required
        ),
        comment: new FormControl({ value: certificate.comment, disabled: this.isRequestApproved }),
      })
    );
  });

  // Update the data source for the table
  this.dataSource.data = certificates;
}

get rows(): FormArray {
  return this.form.get('rows') as FormArray;
}

// get requestDetailsValue() {
//   return this.requestDetails() || { officeComment: '', deliveredTo: '' }; // provide default values
// }
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
  if (!this.requestDetails()?.address && ! this.form.get('deliveredTo')) {
    this.isDeliveredToInvalid = true;
    return; // Stop the function from proceeding
  }
  this.isDeliveredToInvalid = false;// Reset the validation flag if the field is valid
  const statusId = 2; 
  this.isRequestApproved = true;
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
  if (!this.form.valid) {
    console.log('Form is invalid:', this.form.errors);
    this.openSnackBar('בבקשה מלא את כל שדות החובה', 'Close');
    return; // Stop the function if the form is invalid
  }
  this.loading = true;
 if( this.checkNegitiveInventoryBalance()){
  console.log('requestDetails:', this.requestDetails);
  this.requestDetails.update(current => ({ ...current, 
    officeComment: this.form.get('officeComment')?.value, // Access officeComment from the FormGroup
    deliveredTo: this.form.get('deliveredTo')?.value
    } as Requestes)); 
  this.RequestService.updateRequest( this.requestId,previousStatusId, this.requestDetails()).subscribe({
    next: (data:any) => {
      this.requestDetails.set(data.data); 
      this.initialRequest()// Update the request details with the response data
      console.log('Request updated successfully:', data);
      this.loading = false;
    this.openSnackBar("הבקשה עודכנה בהצלחה", "אישור")
    //  let snackBarRef = snackBar.open('Message archived', 'Undo');
  },
   error: (error) => {
      console.error('Error updating status:', error);
    },
    complete:() => this.loading = false
 });
}
else {
  // Handle case where inventory balance is negative
  this.loading = false;
  this.openSnackBar("לא ניתן לעדכן את הבקשה עקב מלאי שלילי", "סגור");
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
print() {
  const content = document.querySelector(".request-details-card"); // Select the card content
  const printWindow = window.open("", "_blank", "width=800,height=600");

  if (content && printWindow) {
    // Clone the content to manipulate it without affecting the original DOM
    const clonedContent = content.cloneNode(true) as HTMLElement;
     // Remove unwanted elements from the cloned content
    const elementsToRemove = clonedContent.querySelectorAll(".button-group, #print-button-container");
    elementsToRemove.forEach((element) => element.remove());
    // Update input fields with their current values
    const inputs = clonedContent.querySelectorAll("input");
    inputs.forEach((input) => {
      const originalInput = content.querySelector(`input[formControlName="${input.getAttribute("formControlName")}"]`) as HTMLInputElement;
      if (originalInput) {
        input.setAttribute("value", originalInput.value); // Set the value from the original DOM
      }
    });

    // Update the officeComment textarea with its current value
    const officeCommentTextarea = clonedContent.querySelector('.office-comment-textarea') as HTMLTextAreaElement;
    if (officeCommentTextarea) {
      const officeCommentValue = this.form.get('officeComment')?.value || ''; // Access officeComment value from the FormControl
      officeCommentTextarea.textContent = officeCommentValue; // Set the value from the FormControl
    }
console.log(officeCommentTextarea);

    // Update other textarea fields with their current values
    const textareas = clonedContent.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
      const originalTextarea = content.querySelector(`textarea[formControlName="${textarea.getAttribute("formControlName")}"]`) as HTMLTextAreaElement;
      if (originalTextarea) {
        textarea.textContent = originalTextarea.value; // Set the value from the original DOM
      }
    });

    // Update table inputs and textareas bound to ngModel
    const tableInputs = clonedContent.querySelectorAll("input.editable-input");
    tableInputs.forEach((input, index) => {
      const originalInput = content.querySelectorAll("input.editable-input")[index] as HTMLInputElement;
      if (originalInput) {
        input.setAttribute("value", originalInput.value); // Set the value from the original DOM
      }
    });

    const tableTextareas = clonedContent.querySelectorAll("textarea.textarea-table");
    tableTextareas.forEach((textarea, index) => {
      const originalTextarea = content.querySelectorAll("textarea.textarea-table")[index] as HTMLTextAreaElement;
      if (originalTextarea) {
        textarea.textContent = originalTextarea.value; // Set the value from the original DOM
      }
    });
console.log();

    // Write the updated content to the print window
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>פרטי הבקשה</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .request-details-card { width: 100%; }
            .list-group-item { margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          ${clonedContent.outerHTML} <!-- Use the cloned content -->
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
}
}
