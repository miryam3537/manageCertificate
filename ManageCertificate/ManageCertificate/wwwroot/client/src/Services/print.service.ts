import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class PrintService {
    downloadExcel(data: any[], fileName: string, sheetName: string) {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const workbook: XLSX.WorkBook = { Sheets: { [sheetName]: worksheet }, SheetNames: [sheetName] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    printAllRequestesTable(): void {
        const councilValue = (document.querySelector('input[placeholder="הכנס לשכה"]') as HTMLInputElement)?.value || 'לא סונן';
    const requestIdValue = (document.querySelector('input[placeholder="הכנס מספר בקשה"]') as HTMLInputElement)?.value || 'לא סונן';
    const statusSelect = (document.querySelector('mat-select') as HTMLElement)?.innerText?.trim() || 'לא סונן';
    const dateInput = Array.from(document.querySelectorAll('input'))
      .find(input => input.placeholder === 'הכנס תאריך' || input.getAttribute('ng-reflect-mat-datepicker')) as HTMLInputElement;
    const dateFilter = dateInput?.value?.trim() || 'לא סונן';
    
    
    
        const orginalTable = document.querySelector('.table-container') as HTMLElement;
        const tableContainer = orginalTable.cloneNode(true) as HTMLElement;
        const actionsColumn = tableContainer.querySelector('ng-container[matColumnDef="Actions"]') as HTMLElement;
        const headerRow = tableContainer.querySelector('tr[mat-header-row]') as HTMLElement;
        const dataRows = tableContainer.querySelectorAll('tr[mat-row]');
      
        // שמירת עמודת ה-Actions
        const actionsColumnClone = actionsColumn?.cloneNode(true);
      
        // הסרת עמודת ה-Actions
        if (actionsColumn) {
          actionsColumn.remove();
        }
        if (headerRow) {
          const headerCells = headerRow.querySelectorAll('th');
          headerCells.forEach((cell) => {
            if (cell.textContent?.trim() === 'הצגת פרטי הבקשה') {
              cell.remove();
            }
          });
        }
        dataRows.forEach((row) => {
          const cells = row.querySelectorAll('td');
          if (cells.length > 0) {
            cells[cells.length - 1].remove(); // הסרת התא האחרון (עמודת ה-Actions)
          }
        });
        // פתיחת חלון ההדפסה
        const WindowPrt = window.open('', '', 'width=900,height=650');
        if (WindowPrt) {
          WindowPrt.document.write(`
            <html>
              <head>
                <title>הדפסת טבלה</title>
                <style>
                 body {
                font-family: Arial, sans-serif;
                margin: 20px;
                direction: rtl;
              }
              .filters-summary {
                margin-bottom: 20px;
                font-size: 16px;
                font-weight: bold;
              }
                  table {
                    width: 100%;
                    border-collapse: collapse;
                  }
                  th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                  }
                  th {
                    background-color: #f2f2f2;
                  }
                  .mat-sort-header-arrow {
                    display: none !important; /* הסתרת החיצים למיון */
                  }
                  .table-container {
                    margin: 0;
                    padding: 0;
                  }
                  table {
                    font-size: 12px; /* הקטנת גודל הטקסט */
                  }
                    
                </style>
              </head>
             <body>
            <div class="filters-summary">
              <p>סינון לפי לשכת נישואין: ${councilValue}</p>
              <p>סינון לפי מספר בקשה: ${requestIdValue}</p>
              <p>סינון לפי סטטוס בקשה: ${statusSelect}</p>
              <p>סינון לפי תאריך הזמנה: ${dateFilter}</p>
            </div>
            ${tableContainer.innerHTML}
          </body>
            </html>
          `);
          WindowPrt.document.close();
          WindowPrt.focus();
          WindowPrt.print();
          WindowPrt.close();
        }
      
        // שחזור עמודת ה-Actions
        if (actionsColumnClone) {
          tableContainer.appendChild(actionsColumnClone);
        }
      }
      
  printTable(tableNumber: number): void {
    const yearPlaceholder = tableNumber === 1 ? 'הכנס שנה' : '2025';
    const showCouncilFilter = tableNumber === 1;
    const tableSelector = tableNumber === 1 ? '#inventoryList' : '#inventoryBalance';
    const filtersWrapperId = tableNumber === 1 ? '#filtersWrapper1' : '#filtersWrapper2';
    
    const inventoryList = document.querySelector(tableSelector) as HTMLElement;
    if (!inventoryList) return;
    
    const filtersWrapper = document.querySelector(filtersWrapperId) as HTMLElement;
    if (!filtersWrapper) return;
    
    const yearInput = filtersWrapper.querySelector(`input[placeholder="${yearPlaceholder}"]`) as HTMLInputElement;
    if (!yearInput) return;
    
    const yearFilter = yearInput.value || 'לא סונן';
    const councilInput = showCouncilFilter
        ? filtersWrapper.querySelector('input[placeholder="הכנס לשכה"]') as HTMLInputElement
        : null;
    const councilFilter = showCouncilFilter ? councilInput?.value || 'לא סונן' : null;
    
    const inventoryClone = inventoryList.cloneNode(true) as HTMLElement;
    
 
    const actionsColumn = inventoryClone.querySelector('ng-container[matColumnDef="Actions"]') as HTMLElement;
    const headerRow = inventoryClone.querySelector('tr[mat-header-row]') as HTMLElement;
    const dataRows = inventoryClone.querySelectorAll('tr[mat-row]');

    if (actionsColumn) {
        actionsColumn.remove();
    }
    if (headerRow) {
        const headerCells = headerRow.querySelectorAll('th');
        headerCells.forEach((cell) => {
            if (cell.textContent?.trim() === 'שמור') {
                cell.remove();
            }
        });
    }
    dataRows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
            cells[cells.length - 1].remove();
        }
    });

    const WindowPrt = window.open('', '', 'width=900,height=650');
    if (WindowPrt) {
        WindowPrt.document.write(`
            <html>
                <head>
                    <title>הדפסת דוחות מלאי</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 20px;
                            direction: rtl;
                        }
                        .filters-summary {
                            margin-bottom: 20px;
                            font-size: 16px;
                            font-weight: bold;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: right;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <div class="filters-summary">
                        <p>סינון לפי שנה: ${yearFilter}</p>
                        ${showCouncilFilter ? `<p>סינון לפי לשכה: ${councilFilter}</p>` : ''}
                    </div>
                    <div class="inventory-container">
                        ${inventoryClone.innerHTML}
                    </div>
                </body>
            </html>
        `);
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
        WindowPrt.close();
    }
  }}