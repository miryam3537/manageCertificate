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
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RefOfficeInventory } from '../../Models/RefOfficeInventory';
import { Requestes } from '../../Models/Requestes';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddInventoryDialogComponent } from '../add-inventory-dialog/add-inventory-dialog.component';
import { errorContext } from 'rxjs/internal/util/errorContext';
import {  MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    ReactiveFormsModule,
    
    MatSnackBarModule
 
  ],
  templateUrl: './inventory-reports.component.html',
  styleUrl: './inventory-reports.component.css',
  providers: [RefServService,CertificateService, RequestService,PrintService]
})
export class InventoryReportsComponent implements OnInit{
  filterForm: FormGroup;
  displayedOfficeInventoryColumns: string[] = ['certificateName', 'inventory', 'minimum', 'year', 'unusedInventoryBalance'];
  ListRefInventory: RefInventory[] = [];
  ListRefInventoryOriginal: RefInventory[] = [];

  ListAllCertificates: Certificate[] = [];
  ListRefCertificateType: RefCertificateType[] = [];
  ListRefCouncil: RefCouncil[] = [];
  updatedCertificateTypes: any[] = [];
  isLoading: boolean = true;
  isReset: boolean = false;
  selectedYearTable2: number | null = null;
  selectedYearTable1: number | null = null;
  selectedCertificate: number | null = null; 
  selectCouncil: string = ''; 
  selectedCouncilId: number | null = null;
  currentYear = new Date().getFullYear();
    allRequests: Requestes[] = [];
  displayedColumns: string[] = ['name','year', 'inventoryBalance','inventory','minimumBalance'];
  inventoryDisplayedCol: string[] = ['councilName','year','certificate', 'totalSupplyAmount', 'inventoryBalance','inventory'];
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
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    // אתחול filterForm בקונסטרקטור
    this.filterForm = this.fb.group({
      year: [''], 
      councilName: [''], 
      certificateName: [''], 
    });
  }
   ngOnInit() {
    this.loadData();
    this.filterForm.valueChanges.subscribe((val) => {
      const year = +val.year;
      if (year) {
        this.calculateUtilizationPerYear(year); // שורת מפתח!!!
      }
      this.applyFilter();
    });
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
          this.ListRefInventoryOriginal = inventories;
this.ListRefInventory = [...inventories]; // העתק ולא הפניה ישירה

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
          this.calculateUtilizationPerYear(this.currentYear);
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
          this.snackBar.open('הפעולה בוצעה בהצלחה', 'סגור', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          });
          
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
          this.snackBar.open('הפעולה בוצעה בהצלחה', 'סגור', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          });
          this.loadData();
        }
      });
  
  }
  calculateUtilizationPerYear(year: number) {
    const updated = this.ListRefInventoryOriginal
      .filter(item => item.year === year)
      .map((item) => {
        const total = this.RefServService.getTotalSupplyAmountForCertificate(
          this.ListAllCertificates,
          this.allRequests,
          item.certificateId ?? 0,
          year,
          item.councilId
        );
  
        return {
          ...item,
          totalSupplyAmount: total
        };
      });
  
    this.ListRefInventory = updated;
    this.applyFilter();
  }
  
  
//  calculateUtilizationPerYear(selectedYear: number = this.currentYear) {
//   const observablesArray = this.ListRefInventory.map((inventory) => {
//     // שלב 1: סינון התעודות לפי סוג תעודה ובקשה קיימת
//     const matchingCertificates = this.ListAllCertificates.filter(
//       (certificate) =>
//         certificate.certificateType === inventory.certificateId &&
//         certificate.requestId != null
//     );

//     if (matchingCertificates.length === 0) {
//       return of({ inventoryId: inventory.inventoryId, total: 0 });
//     }

//     // שלב 2: עבור כל תעודה – מוצאים את הבקשה התואמת מהמערך allRequests
//     const results = matchingCertificates.map((certificate) => {
//       const request = this.allRequests.find((r) => r.requestId === certificate.requestId);
//       if (!request || !request.handlingDate) {
//         return { certificate, isMatch: false };
//       }

//       const handlingYear = new Date(request.handlingDate).getFullYear();
//       const isMatch =
//         request.councilId === inventory.councilId &&
//         handlingYear === selectedYear &&
//         request.requestStatus === 2;

//       return { certificate, isMatch };
//     });

//     // שלב 3: חישוב סך ה-supplyAmount רק עבור תעודות מתאימות
//     const total = results
//       .filter((r) => r.isMatch)
//       .reduce((sum, r) => sum + (r.certificate.supplyAmaunt || 0), 0);

//     return of({ inventoryId: inventory.inventoryId, total });
//   });

//   // שלב 4: מריצים את כל האובזרוובלים במקביל
//   forkJoin(observablesArray).subscribe({
//     next: (results) => {
//       const resultMap = new Map(results.map((r) => [r.inventoryId, r.total]));
//       this.ListRefInventory = this.ListRefInventory.map((item) => ({
//         ...item,
//         totalSupplyAmount: resultMap.get(item.inventoryId) || 0,
//       }));
//       this.applyFilter();
//     },
//     error: (err) => {
//       console.error('שגיאה בזמן חישוב הניצול:', err);
//     },
//   });
// }

  
  
applyFilter() {
  const { year, councilName, certificateName } = this.filterForm.value;

  this.filteredInventory = this.ListRefInventory.filter(item => {
    const matchYear = !year || item.year === +year;
    const matchCouncil = !councilName || item.council?.name?.toLowerCase().includes(councilName.toLowerCase());
    const matchCertificate = !certificateName || item.certificateId === +certificateName;
    return matchYear && matchCouncil && matchCertificate;
  });
}

    onInputChangeYearTable2(event: Event) {
      this.selectedYearTable2 = (event.target as HTMLInputElement).valueAsNumber || null;
      this.officeSupplies2(this.selectedYearTable2 || this.currentYear);
      
    }
    resetFilters() {
      this.filterForm.reset();
      setTimeout(() => {
        this.isReset = false;
      }, 0);
      this.filteredInventory = [...this.ListRefInventory]; 
    }
    officeSupplies2(year: number) {
      this.UpdateListAllOfficeInventory = this.ListAllOfficeInventory
        .filter(item => item.year === year)
        .map(item => {
          const matchingType = this.ListRefCertificateType.find(type => type.id === item.certificateId);
    
          const totalSupplyAmount = this.RefServService.getTotalSupplyAmountForCertificate(
            this.ListAllCertificates,
            this.allRequests,
            item.certificateId,
            item.year
          );
    
          return {
            ...item,
            certificateName: matchingType?.name || 'לא זוהה',
            minimum: matchingType?.minimum || 0,
            unusedInventoryBalance: (item.inventory || 0) - totalSupplyAmount,
            totalSupplyAmount // חדש – שיהיה זמין גם להצגה בטבלה
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