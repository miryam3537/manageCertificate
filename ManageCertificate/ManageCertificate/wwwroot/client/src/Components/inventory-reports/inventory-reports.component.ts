import { Component, OnInit } from '@angular/core';
import { RefServService } from '../../Services/ref-serv.service';
import { RefInventory } from '../../Models/RefInventory';
import { Certificate } from '../../Models/Certificate';
import { RefCertificateType } from '../../Models/RefCertificateType';
import { combineLatest, take } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import {  MatNativeDateModule } from '@angular/material/core';
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
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-inventory-reports',
  imports: [    RouterModule,
    MatGridListModule,
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
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
    MatGridList,
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
  selectedYearTable2: number | null = null;
  selectedYearTable1: number | null = null;
  selectCouncil: string = ''; 
  selectedCouncilId: number | null = null;
  currentYear = new Date().getFullYear();
  displayedColumns: string[] = ['name', 'inventoryBalance','inventory','minimumBalance','save'];
  inventoryDisplayedCol: string[] = ['councilName','year','certificate','inventory','supplyAmmount','inventoryBalance','save'];
  filteredInventory: RefInventory[] = [];
  
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
      ]).pipe(take(1)).subscribe({
        next: ([certificateTypes, inventories, certificates, refCouncil]) => {
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
          this.applyFilter()
        },
        error: (error) => {
          console.error('Error while loading data:', error);
          this.isLoading = false;
        }
      });
    }

    applyFilter() {
      this.filteredInventory = this.ListRefInventory.filter(item => {
        const yearMatch = this.selectedYearTable1 === null || item.year === this.selectedYearTable1;
        const councilMatch = this.selectCouncil === '' || item.council?.name?.toLowerCase().includes(this.selectCouncil.toLowerCase());
        return yearMatch && councilMatch;
      });
    }
  
    onInputChangeYearTable1(event: Event) {
      this.selectedYearTable1 = (event.target as HTMLInputElement).valueAsNumber || null;
      this.applyFilter();
    }
  
    onInputChangeCouncil(event: Event) {
      const target = event.target as HTMLInputElement | null;
      if (target && target.value !== undefined) {
        this.selectCouncil = target.value || '';
        this.applyFilter();
      } else {
        console.error('Event target is not an HTMLInputElement or value is undefined');
      }
    }
    onInputChangeYearTable2(event: Event) {
      this.selectedYearTable2 = (event.target as HTMLInputElement).valueAsNumber || null;
      this.InventoryManagement(this.selectedYearTable2 || this.currentYear);
      
    }
    resetFilters() {
      this.selectedYearTable2 = null;
      this.selectCouncil = '';
      this.isReset = true;
      setTimeout(() => {
        this.isReset = false;
      }, 0);
      this.filteredInventory = [...this.ListRefInventory]; // איפוס הסינון
    }
    InventoryManagement(year:number){
      this.updatedCertificateTypes = this.ListRefCertificateType.map(refCertificateType => {
      const totalSupplyAmount = this.ListAllCertificates
          .filter(certificate => certificate.certificateType === refCertificateType.id)
          .reduce((acc, certificate) => acc + (certificate.supplyAmaunt || 0), 0);
      const totalInventory = this.ListRefInventory
          .filter(inventory => inventory.certificateId === refCertificateType.id && inventory.year===year)
          .reduce((acc, inventory) => acc + (inventory.inventory || 0), 0);
      //const minimum =refCertificateType.minimum;
      return {
        ...refCertificateType, 
        TOTAL_INVENTORY_BALANCES:(totalInventory-totalSupplyAmount) || -1,
        CURRENT_iNVENTORY:(totalInventory) || 0,
       // MINIMUM_INVENTORY_BALANCES: minimum || 0,
      };
    });
    console.log(this.updatedCertificateTypes,"@@@@@@@@@@@");
    }
  
  
}
