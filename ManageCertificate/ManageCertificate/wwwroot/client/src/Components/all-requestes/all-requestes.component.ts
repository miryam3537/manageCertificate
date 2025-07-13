
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
import { combineLatest, take } from 'rxjs';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RefServService } from '../../Services/ref-serv.service';
import { RequestService } from '../../Services/request.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RefInventory } from '../../Models/RefInventory';
import { RefCertificateType } from '../../Models/RefCertificateType';
import { Certificate } from '../../Models/Certificate';
import { MatCardModule } from '@angular/material/card';
import { CertificateService } from '../../Services/certificate.service';
import { PrintService } from '../../Services/print.service';
import * as XLSX from 'xlsx';
import { OfficeInventoryService } from '../../Services/office-inventory.service';
import { RefOfficeInventory } from '../../Models/RefOfficeInventory';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-all-requestes',
  imports: [
    RouterModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
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
    MatSortModule,
    MatCardModule
  ],
  templateUrl: './all-requestes.component.html',
  styleUrl: './all-requestes.component.css',
  providers: [RequestService, RefServService, CertificateService,PrintService,OfficeInventoryService ],
})

export class AllRequestesComponent implements OnInit {
  displayedColumns: string[] = ['requestId', 'orderDate', 'deliveryMethod', 'officeComment', 'requestStatus', 'councilId', 'Actions'];
  ListRefStatus: RefStatus[] = [];
  ListRefInventory: RefInventory[] = [];
  ListAllCertificate: Certificate[] = [];
  ListRequestes = new MatTableDataSource<Requestes>([]);
  ListRefAllStatus: RefStatus[] = [];
  ListRefCertificateType: RefCertificateType[] = [];
  updatedCertificateTypes: any[] = [];
  allRequests: Requestes[] = [];
  isLoading: boolean = true;
  isReset: boolean = false;
  amount: number = 0; 
  inventory:object[] = [];
  ListAllOfficeInventory:RefOfficeInventory[]=[]
  @ViewChild(MatSort) sort!: MatSort;
  filterForm: FormGroup;
  constructor(
    public RequestService: RequestService,
    private RefServService: RefServService,
    public certificateService: CertificateService,
    public PrintService: PrintService,
    public OfficeInventoryService:OfficeInventoryService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      selectedStatus: [''],
      selectedCouncilId: [''],
      selectedRequestId: [''],
      selectedDate: [null],
    });
    
    
  }

  ngOnInit() {
    this.initialData();
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters(); // הפעלת הסינון בכל שינוי בטופס
    });
  }
  
  initialData() {
    this.isLoading = true;

    combineLatest([
      this.RequestService.getAll(),
      this.RefServService.getAllCertificateType(this.ListRefCertificateType),
      this.RefServService.getAllRefStatus(this.ListRefStatus),
      this.RefServService.getAllInventory(),
      this.certificateService.getAllCertificate(),
      this.RefServService.getAllOfficeInventory(),
    ]).pipe(take(1)).subscribe({
      next:
      ([requests, certificateTypes, refStatuses, inventories, certificates,officeInventory]) => {
        this.allRequests = requests;
      this.ListRequestes.data = this.allRequests.filter(request =>
        request.requestStatus === 1 || request.requestStatus === 3
      ); 
        this.ListRequestes.sort = this.sort; 
        this.ListRefCertificateType = certificateTypes;
        this.ListRefStatus = refStatuses;
        this.ListRefInventory = inventories;
        this.ListAllCertificate = certificates;
        this.ListAllOfficeInventory = officeInventory;
        console.log('ListRequestes:', this.ListRequestes);
        console.log('ListRefCertificateType:', this.ListRefCertificateType);
        console.log('ListRefStatus:', this.ListRefStatus);
        console.log('ListRefInventory:', this.ListRefInventory);
        console.log('ListAllCertificate:', this.ListAllCertificate);
        console.log('ListAllOfficeInventory:', this.ListAllOfficeInventory);
        this.totalInventoryBalance();
        this.isLoading = false;
      },
      error:(error) => {
        console.error('Error while loading data:', error);
        this.isLoading = false;
      }
  });
  }
onPrintAllRequestesTable() {
  this.PrintService.printAllRequestesTable();
}
applyFilters() {
  const filters = this.filterForm.value;
  this.RequestService.selectedStatus = filters.selectedStatus;
  this.RequestService.selectedCouncilId = filters.selectedCouncilId;
  this.RequestService.selectedRequestId = filters.selectedRequestId ? parseInt(filters.selectedRequestId, 10) : null;
  this.RequestService.selectedDate = filters.selectedDate;

  this.ListRequestes.data = this.RequestService.filterRequests(this.allRequests);
}


  resetFilters() {
    this.RequestService.selectedStatus = null;
    this.RequestService.selectedCouncilId = null;
    this.RequestService.selectedRequestId = null;
    this.RequestService.selectedDate = null;
    this.isReset = true; 
    setTimeout(() => {
      this.isReset = false; 
    }, 0);
    this.initialData();
  }
  totalInventoryBalance() {
 
     const currentYear = new Date().getFullYear();
     this.updatedCertificateTypes = this.ListRefCertificateType.map(item =>{
      const totalInventory = this.ListAllOfficeInventory
      .filter(certificate =>
        certificate.year==currentYear && certificate.certificateId==item.id)
      .reduce((acc, certificate) => acc + (certificate.inventory || 0), 0)
        return {
              ...item, 
              TOTAL_INVENTORY_BALANCES:totalInventory|| 0
            }; 
          });
          console.log('Updated Certificate Types with Total Supply Amount:', this.updatedCertificateTypes);
        }
    
  downloadTableAsExcel() {
    // עיצוב הנתונים לפני יצירת קובץ ה-Excel
    const formattedData = this.ListRequestes.data.map((request) => ({
      'מספר בקשה': request.requestId,
      'רשם': request.ordererRole,
      'שם רשם': request.ordererName,
      'מספר טלפון רשם': request.ordererPhone,
      'כתובת אימייל רשם': request.ordererEmail,
      'תאריך הזמנה': request.orderDate,
      'שיטת משלוח': request.deliveryMethod,
      'הערות משרד': request.officeComment,
      'סטטוס בקשה': request.requestStatusNavigation?.name,
      ' לשכה': request.council?.name,
      'סוג איסוף': request.deliveryMethod ,
      'כתובת': request.address,
      'נשלח אל': request.deliveredTo,
    }));
  
    // יצירת גיליון עבודה עם הנתונים המעוצבים
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);
  
    // יצירת חוברת עבודה
    const workbook: XLSX.WorkBook = { Sheets: { 'Requests': worksheet }, SheetNames: ['Requests'] };
  
    // כתיבת הקובץ בפורמט Excel
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // יצירת Blob להורדה
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
    // יצירת URL זמני להורדה
    const url = window.URL.createObjectURL(blob);
  
    // יצירת אלמנט להורדה
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AllRequests.xlsx';
    a.click();
  
    // ניקוי ה-URL הזמני
    window.URL.revokeObjectURL(url);
  }
}
