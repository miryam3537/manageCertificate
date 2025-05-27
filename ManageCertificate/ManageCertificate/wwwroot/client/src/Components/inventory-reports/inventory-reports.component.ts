import { Component, OnInit } from '@angular/core';
import { RefServService } from '../../Services/ref-serv.service';
import { RefInventory } from '../../Models/RefInventory';
import { Certificate } from '../../Models/Certificate';
import { RefCertificateType } from '../../Models/RefCertificateType';
import { catchError, combineLatest, forkJoin, map, Observable, of, take } from 'rxjs';
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
import { Router, RouterModule } from '@angular/router';
import { RefCouncil } from '../../Models/RefCouncil';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { CertificateService } from '../../Services/certificate.service';
import { RequestService } from '../../Services/request.service';
import { firstValueFrom } from 'rxjs';
import { PrintService } from '../../Services/print.service';
// import { forkJoin } from 'rxjs';
// import { map } from 'rxjs/operators';

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
  providers: [RefServService,CertificateService, RequestService,PrintService]
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
  displayedColumns: string[] = ['name', 'inventoryBalance','inventory','minimumBalance','Actions'];
  inventoryDisplayedCol: string[] = ['councilName','year','certificate','inventory', 'totalSupplyAmount', 'inventoryBalance','Actions'];
  filteredInventory: RefInventory[] = [];
  finalResults: any[] = []; // משתנה לשמירת התוצאות
  constructor(
    public RefServService: RefServService,
    public certificateService: CertificateService,
    public requestService: RequestService,
    public printService: PrintService,
    private router: Router
  ) {}
   ngOnInit() {
      this.loadData();
  
      //לבדוק למה אי אפשר לקבל מהשירות בצורה כזאת את הרשימה
      //this.ListAllCertificates==this.certificateService.ListCertificate;
    }

    loadData() {
      this.isLoading = true;
     
      combineLatest([
        this.RefServService.getAllCertificateType(this.ListRefCertificateType),
        this.RefServService.getAllInventory(),
        this.certificateService.getAllCertificate(),
        this.RefServService.getAllRefCouncil(this.ListRefCouncil),
        
      ]).pipe(take(1)).subscribe({
        next: ([certificateTypes, inventories, certificates,refCouncil]) => {
          this.ListRefCertificateType = certificateTypes;
          this.ListRefInventory = inventories;
          this.ListAllCertificates = certificates;
          this.ListRefCouncil = refCouncil;
          console.log('ListRefCouncil: קומפ', this.ListRefCouncil);
          console.log('ListRefCertificateType:', this.ListRefCertificateType);
          console.log('ListRefInventory:', this.ListRefInventory);
          console.log('ListAllCertificate:', this.ListAllCertificates);
          this.calculateUtilizationPerYear();
          this.OfficeSupplies(this.currentYear);
          this.isLoading = false;
          this.applyFilter()
          
        },
        error: (error) => {
          console.error('Error while loading data:', error);
          this.isLoading = false;
        }
      });
    }

 
calculateUtilizationPerYear() {
  // יצירת מערך של Observable לחישוב הניצול השנתי עבור כל רשומה
  const utilizationResults$ = this.ListRefInventory.map((inventory) => {
    // חיפוש כל התעודות המתאימות ל-inventory הנוכחי
    const matchingCertificates = this.ListAllCertificates.filter(
      (certificate) => certificate.certificateType === inventory.certificateId
    );

    // יצירת בקשות אסינכרוניות לבדיקה אם המועצה מתאימה
    const requests = matchingCertificates.map((certificate) =>
      this.requestService.getCouncilId(certificate.requestId || 76).pipe(
        map((councilId) => ({
          certificate,
          isCouncilMatch: councilId === inventory.councilId, // בדיקת התאמה בין המועצה לתעודה
        })),
        catchError(() => of({ certificate, isCouncilMatch: false })) // טיפול בשגיאות
      )
    );

    // אם אין תעודות מתאימות, החזר ערך ברירת מחדל
    if (requests.length === 0) {
      return of({ inventory, totalSupplyAmount: 0 });
    }

    // שילוב התוצאות עבור כל inventory
    return forkJoin(requests).pipe(
      map((results) => ({
        inventory,
        totalSupplyAmount: results
          .filter((result) => result.isCouncilMatch) // סינון תעודות עם התאמה
          .reduce(
            (sum, result) => sum + (result.certificate.supplyAmaunt || 0),
            0
          ), // חישוב סך ה-supplyAmount
      }))
    );
  });

  // אם יש תוצאות לחישוב
  if (utilizationResults$.length > 0) {
    forkJoin(utilizationResults$).subscribe(
      (finalResults) => {
        // שילוב התוצאות עם רשימת ה-inventory להצגה בטבלה
        this.ListRefInventory = this.ListRefInventory.map((inventory) => {
          const result = finalResults.find((r) => r.inventory === inventory);
          return {
            ...inventory,
            totalSupplyAmount: result ? result.totalSupplyAmount : 0, // הוספת totalSupplyAmount לכל רשומה
          };
        });

        // עדכון הטבלה לאחר חישוב הניצול השנתי
        this.applyFilter();
      },
      (error) => {
        console.error('Error processing results:', error);
      }
    );
  }
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
      this.OfficeSupplies(this.selectedYearTable2 || this.currentYear);
      
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
  
    OfficeSupplies(year:number){
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
    console.log(this.updatedCertificateTypes,"@@@@@@@ @@@");
    }
    goBackToRequests(): void {
      this.router.navigate(['']); // נווט לדף הבקשות
    }
    onPrintTable(tableId: number): void {
      this.printService.printTable(tableId);
    }
  }    
