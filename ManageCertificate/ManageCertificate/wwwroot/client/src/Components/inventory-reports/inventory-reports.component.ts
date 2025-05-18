import { Component, OnInit } from '@angular/core';
import { RefServService } from '../../Services/ref-serv.service';
import { RefInventory } from '../../Models/RefInventory';
import { Certificate } from '../../Models/Certificate';
import { RefCertificateType } from '../../Models/RefCertificateType';
import { combineLatest } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RefCouncil } from '../../Models/RefCouncil';

@Component({
  selector: 'app-inventory-reports',
  imports: [    RouterModule,
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
    MatCardModule],
  templateUrl: './inventory-reports.component.html',
  styleUrl: './inventory-reports.component.css',
  providers: [RefServService ]
})
export class InventoryReportsComponent implements OnInit{
  
  ListRefInventory: RefInventory[] = [];
  ListAllCertificates: Certificate[] = [];
  ListRefCertificateType: RefCertificateType[] = [];
  ListRefCouncil: RefCouncil[] = [];
  updatedCertificateTypes: any[] = [];
  isLoading: boolean = true;
  isReset: boolean = false;
  selectedYear: number | null = null;
  selectedCouncilId: number | null = null;
  currentYear = new Date().getFullYear();
  displayedColumns: string[] = ['name', 'inventoryBalance','inventory','minimumBalance','save'];
  inventoryDisplayedCol: string[] = ['councilName','year','certificate','inventory','supplyAmmount','inventoryBalance','save'];
  constructor(
    public RefServService: RefServService
  ) {}
   ngOnInit() {
      this.loadData();
    }
    
    loadData() {
      this.isLoading = true;
  
      combineLatest([
        this.RefServService.getAllCertificateType(this.ListRefCertificateType),
        this.RefServService.getAllInventory(),
        this.RefServService.getAllCertificate(),
        this.RefServService.getAllRefCouncil(this.ListRefCouncil),
      ]).subscribe(
        ([ certificateTypes, inventories, certificates, refCouncil]) => {
          this.ListRefCertificateType = certificateTypes;
          this.ListRefInventory = inventories;
          this.ListAllCertificates = certificates;
          this.ListRefCouncil = refCouncil;
          console.log('ListRefCouncil: קומפ', this.ListRefCouncil);
          console.log('ListRefCertificateType:', this.ListRefCertificateType);
          console.log('ListRefInventory:', this.ListRefInventory);
          console.log('ListAllCertificate:', this.ListAllCertificates);
          this.InventoryManagement(this.currentYear);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error while loading data:', error);
          this.isLoading = false;
        }
      );
    }

    
    InventoryManagement(year:number){
      this.updatedCertificateTypes = this.ListRefCertificateType.map(refCertificateType => {
      const totalSupplyAmount = this.ListAllCertificates
          .filter(certificate => certificate.certificateType === refCertificateType.id)
          .reduce((acc, certificate) => acc + (certificate.supplyAmaunt || 0), 0);
      const totalInventory = this.ListRefInventory
          .filter(inventory => inventory.certificateId === refCertificateType.id && inventory.year===year)
          .reduce((acc, inventory) => acc + (inventory.inventory || 0), 0);
      return {
        ...refCertificateType, 
        TOTAL_INVENTORY_BALANCES:(totalInventory-totalSupplyAmount) || -1,
        CURRENT_iNVENTORY:(totalInventory) || 0
        //MINIMUM_INVENTORY_BALANCES: refCertificateType.minimum || 0,
      };
     
      
    });
    console.log(this.updatedCertificateTypes,"@@@@@@@@@@@");
    }

   
    onInputChangeYear(event: Event): void{
      this.selectedYear = (event.target as HTMLInputElement).valueAsNumber;
      this.InventoryManagement(this.selectedYear);
    }
    onInputChangeCouncilId(){
      this.selectedCouncilId = (event?.target as HTMLInputElement).valueAsNumber;
      // this.updatedCertificateTypes = this.updatedCertificateTypes.filter(x=>x.this.selectedCouncilId)
    }
   
}
