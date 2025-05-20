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
import { RequestServiceService } from '../../Services/request-service.service';
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
    MatSortModule,
    MatCardModule
  ],
  templateUrl: './all-requestes.component.html',
  styleUrl: './all-requestes.component.css',
  providers: [RequestServiceService, RefServService, CertificateService],
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
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public RequestServiceService: RequestServiceService,
    private RefServService: RefServService,
    public certificateService: CertificateService
  ) {}

  ngOnInit() {
    this.initialData();
  }
  
  initialData() {
    this.isLoading = true;

    combineLatest([
      this.RequestServiceService.getAll(),
      this.RefServService.getAllCertificateType(this.ListRefCertificateType),
      this.RefServService.getAllRefStatus(this.ListRefStatus),
      this.RefServService.getAllInventory(),
      this.certificateService.getAllCertificate(),
    ]).pipe(take(1)).subscribe({
      next:
      ([requests, certificateTypes, refStatuses, inventories, certificates]) => {
        this.ListRequestes.data = requests;
        this.ListRequestes.sort = this.sort; 
        this.ListRefCertificateType = certificateTypes;
        this.ListRefStatus = refStatuses;
        this.ListRefInventory = inventories;
        this.ListAllCertificate = certificates;
        console.log('ListRequestes:', this.ListRequestes);
        console.log('ListRefCertificateType:', this.ListRefCertificateType);
        console.log('ListRefStatus:', this.ListRefStatus);
        console.log('ListRefInventory:', this.ListRefInventory);
        console.log('ListAllCertificate:', this.ListAllCertificate);
        this.supplyAmauntByType();
        this.isLoading = false;
      },
      error:(error) => {
        console.error('Error while loading data:', error);
        this.isLoading = false;
      }
  });
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
  supplyAmauntByType() {
    const currentYear = new Date().getFullYear();
    this.updatedCertificateTypes = this.ListRefCertificateType.map(refCertificateType => {
      const totalSupplyAmount = this.ListAllCertificate
          .filter(certificate => certificate.certificateType === refCertificateType.id)
          .reduce((acc, certificate) => acc + (certificate.supplyAmaunt || 0), 0);
      const totalInventory = this.ListRefInventory
          .filter(inventory => inventory.certificateId === refCertificateType.id && inventory.year === currentYear)
          .reduce((acc, inventory) => acc + (inventory.inventory || 0), 0);
      //const minimumInventory = this.ListRefInventory
      return {
        ...refCertificateType, 
        TOTAL_INVENTORY_BALANCES:(totalInventory-totalSupplyAmount) || -1,
        //MINIMUM_INVENTORY_BALANCES: refCertificateType.minimum || 0,
      };
    });
  
    console.log('Updated Certificate Types with Total Supply Amount:', this.updatedCertificateTypes);
  }
}