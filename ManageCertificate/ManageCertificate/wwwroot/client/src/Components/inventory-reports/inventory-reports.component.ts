import { Component, NgModule, OnInit } from '@angular/core';
import { RefServService } from '../../Services/ref-serv.service';
import { RefInventory } from '../../Models/RefInventory';
import { Certificate } from '../../Models/Certificate';
import { RefCertificateType } from '../../Models/RefCertificateType';
import { catchError, combineLatest, forkJoin, map, Observable, of, take } from 'rxjs';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
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
import { FormsModule } from '@angular/forms';
import { RefOfficeInventory } from '../../Models/RefOfficeInventory';
import { Requestes } from '../../Models/Requestes';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddInventoryDialogComponent } from '../add-inventory-dialog/add-inventory-dialog.component';
import { errorContext } from 'rxjs/internal/util/errorContext';

// import { forkJoin } from 'rxjs';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-inventory-reports',
  imports: [    RouterModule,
    MatGridListModule,
    RouterModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
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
    MatCardModule,
    FormsModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
 
  ],
  templateUrl: './inventory-reports.component.html',
  styleUrl: './inventory-reports.component.css',
  providers: [RefServService,CertificateService, RequestService,PrintService]
})
export class InventoryReportsComponent implements OnInit{
  displayedOfficeInventoryColumns: string[] = ['certificateName', 'inventory', 'minimum', 'year', 'unusedInventoryBalance'];
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
    allRequests: Requestes[] = [];
  displayedColumns: string[] = ['name','year', 'inventoryBalance','inventory','minimumBalance'];
  inventoryDisplayedCol: string[] = ['councilName','year','certificate','inventory', 'totalSupplyAmount', 'inventoryBalance','Actions'];
  filteredInventory: RefInventory[] = [];
   ListAllOfficeInventory:RefOfficeInventory[]=[]
   UpdateListAllOfficeInventory: RefOfficeInventory[] = [];
  finalResults: any[] = []; // משתנה לשמירת התוצאות
  constructor(
    public RefServService: RefServService,
    public certificateService: CertificateService,
    public RequestService: RequestService,
    public printService: PrintService,
    private router: Router,
    public dialog: MatDialog,
  ) {}
   ngOnInit() {
      this.loadData();
    
      //לבדוק למה אי אפשר לקבל מהשירות בצורה כזאת את הרשימה
      //this.ListAllCertificates==this.certificateService.ListCertificate;
    }

    loadData() {
      this.isLoading = true;
     
      combineLatest([
        this.RequestService.getAll(),
        this.RefServService.getAllCertificateType(this.ListRefCertificateType),
        this.RefServService.getAllInventory(),
        this.certificateService.getAllCertificate(),
        this.RefServService.getAllRefCouncil(this.ListRefCouncil),
        this.RefServService.getAllOfficeInventory(),
        
      ]).pipe(take(1)).subscribe({
        next: ([requests,certificateTypes, inventories, certificates,refCouncil,officeInventory]) => {
          this.allRequests = requests;
          this.ListRefCertificateType = certificateTypes;
          this.ListRefInventory = inventories;
          this.ListAllCertificates = certificates;
          this.ListRefCouncil = refCouncil;
          this.ListAllOfficeInventory = officeInventory;
          console.log('ListRefCouncil: קומפ', this.ListRefCouncil);
          console.log('ListRefCertificateType:', this.ListRefCertificateType);
          console.log('ListRefInventory:', this.ListRefInventory);
          console.log('ListAllCertificate:', this.ListAllCertificates);
          console.log('ListAllOfficeInventory:', this.ListAllOfficeInventory);
          console.log('ListRequestes:', this.allRequests);
          // this.totalInventoryBalance();
          this.calculateUtilizationPerYear();
          //is.OfficeSupplies(this.currentYear);
          this.officeSupplies2(this.currentYear);
          this.isLoading = false;
          this.applyFilter()
          
        },
        error: (error) => {
          console.error('Error while loading data:', error);
          this.isLoading = false;
        }
      });
    }
   
  onAddInventory(): void {
    const dialogRef = this.dialog.open(AddInventoryDialogComponent, {
      width: '400px',
      data: {
        certificateTypes: this.ListRefCertificateType // העברת רשימת סוגי התעודה לדיאלוג
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // שליחה לשירות לשמירת הנתונים
        this.RefServService.addToOfficeInventory(result).subscribe({
          next: (response) => {
            console.log('Inventory added successfully:', response);
            console.log('@@@@@@@@@@@@@@',errorContext);
            
            // הוספת הנתונים החדשים למערך המקומי
            this.UpdateListAllOfficeInventory.push(response);
            this.applyFilter();
            this.ngOnInit()
          },
          error: (error) => {
                     console.error('Error adding inventory:', error);
          },
        });
      }
    });
  }
    saveMinimum(type: any) {
//בדיקה אם המינימום הוא מספר חיובי
      if (type.minimum < 0) {
        console.error('Minimum balance must be a positive number');
        return;
      }
      this.RefServService.updateMinimum(type.id,type.minimum).subscribe({
        next: (response) => {
          console.log('Minimum balance updated successfully:', response);
          this.loadData();
        },
        error: (error) => {
          console.error('Error updating minimum balance:', error);
        }
      });
 
    }
    saveInventory(item: any) {
      this.RefServService.updateInventoryAmount(item.inventoryId, item.inventory).subscribe({
        next: (response) => {
          console.log('Inventory updated successfully:', response);
          // עדכון ההצגה של המלאי לאחר השמירה
          this.loadData();
        }
      });
      
  }
calculateUtilizationPerYear() {
  const utilizationResults$ = this.ListRefInventory.map((inventory) => {
    const matchingCertificates = this.ListAllCertificates.filter(
      (certificate) => certificate.certificateType === inventory.certificateId
    );

    // יצירת בקשות אסינכרוניות לבדיקה אם המועצה מתאימה
    const requests = matchingCertificates.map((certificate) =>
      this.RequestService.getCouncilId(certificate.requestId || 76).pipe(
        map((councilId) => ({
          certificate,
          isCouncilMatch: councilId === inventory.councilId, 
        })),
        catchError(() => of({ certificate, isCouncilMatch: false })) 
      )
    );


    if (requests.length === 0) {
      return of({ inventory, totalSupplyAmount: 0 });
    }

    // שילוב התוצאות עבור כל inventory
    return forkJoin(requests).pipe(
      map((results) => ({
        inventory,
        totalSupplyAmount: results
          .filter((result) => result.isCouncilMatch) 
          .reduce(
            (sum, result) => sum + (result.certificate.supplyAmaunt || 0),
            0
          ), 
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
            totalSupplyAmount: result ? result.totalSupplyAmount : 0, 
          };
        });

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
      const yearMatch = this.selectedYearTable1 === null 
          ? item.year === this.currentYear 
          : item.year === this.selectedYearTable1;

      const councilMatch = this.selectCouncil === '' 
          || item.council?.name?.toLowerCase().includes(this.selectCouncil.toLowerCase());

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
      this.officeSupplies2(this.selectedYearTable2 || this.currentYear);
      
    }
    resetFilters() {
      this.selectedYearTable2 = null;
      this.selectCouncil = '';
      this.isReset = true;
      setTimeout(() => {
        this.isReset = false;
      }, 0);
      this.filteredInventory = [...this.ListRefInventory]; 
    }
    officeSupplies2(year: number) {
      this.UpdateListAllOfficeInventory = this.ListAllOfficeInventory
        .filter(item => item.year === year) // סינון לפי השנה שנשלחה כפרמטר
        .map(item => {
          const matchingType = this.ListRefCertificateType.find(type => type.id === item.certificateId);
    
          const totalSupplyAmount = this.ListAllCertificates
            .filter(certificate => {
              const matchingRequest = this.allRequests.find(request => {
                if (!request.handlingDate) {
                  return false; 
                }
    
                // המרת handlingDate למחרוזת בפורמט ISO 8601
                const isoDate = (request.handlingDate instanceof Date)
                  ? request.handlingDate.toISOString() // אם זה אובייקט Date
                  : String(request.handlingDate).replace(' ', 'T'); // אם זה מחרוזת
    
                const handlingYear = new Date(isoDate).getFullYear();
    
                return (
                  request.requestId === certificate.requestId &&
                  handlingYear === item.year && 
                  request.requestStatus === 2 
                );
              });
    
              return certificate.certificateType === item.certificateId && matchingRequest;
            })
            .reduce((sum, certificate) => sum + (certificate.supplyAmaunt || 0), 0);
    
          return {
            ...item,
            certificateName: matchingType?.name || 'לא זוהה',
            minimum: matchingType?.minimum || 0,
            unusedInventoryBalance: (item.inventory || 0) - totalSupplyAmount 
          };
        });
    }

    goBackToRequests(): void {
      this.router.navigate(['']); 
    }
    onPrintTable(tableId: number): void {
      this.currentYear = new Date().getFullYear();
      if (tableId === 1) {
        const year = this.selectedYearTable1 != null ? String(this.selectedYearTable1) : 'לא סונן';
        const council = this.selectCouncil || 'לא סונן';
        this.printService.printTable(1, { year, council });
      } else {
        const year = this.selectedYearTable2 != null ? String(this.selectedYearTable2) : String(this.currentYear);
        this.printService.setInventoryBalanceData(this.UpdateListAllOfficeInventory);
        this.printService.printTable(2, { year });
      }
    }
    
    
    downloadInventoryTable() {
      const formattedData = this.filteredInventory.map((item) => ({
        'שם מועצה': item.council?.name ?? 'N/A',
        'שנה': item.year ?? 'N/A',
        'שם תעודה': item.certificate?.name ?? 'N/A',
        //'אומדן שנתי': item.inventory?.i ?? 'N/A',
// 'ניצול שנתי': item.totalSupplyAmount ? item.totalSupplyAmount : 0,
// 'יתרה לא מנוצלת': item.inventory && item.inventory.inventory
//   ? item.inventory.inventory - (item.totalSupplyAmount || 0)
//   : 0,
      }));
      this.printService.downloadExcel(formattedData, 'InventoryTable', 'Inventory');
    }
    downloadOfficeInventoryTable(UpdateListAllOfficeInventory: any[]) {
      const formattedData =UpdateListAllOfficeInventory.map((type) => ({
        'שם תעודה': type.certificateName ?? 'N/A',
        'יתרת מלאי לא מנוצלת': type.unusedInventoryBalance < 0 ? 'חסר הגדרה' : type.unusedInventoryBalance, 
        'שנה': type.year ?? 'N/A',
        'מלאי עדכני': type.inventory < 0 ? 'חסר הגדרה' : type.inventory,
      
      }));
      
      this.printService.downloadExcel(formattedData, 'OfficeInventoryTable', 'OfficeInventory');
    }
    
  }