import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  printTable(tableNumber: number): void {
    // בחירת האלמנט המתאים לפי מספר הטבלה
    let tableSelector = '';
    if (tableNumber === 1) {
      tableSelector = '#inventoryList';
    } else if (tableNumber === 2) {
      tableSelector = '#inventoryBalance';
    }
  
    // בחירת האלמנטים של תבניות הסינון והטבלה
    const filtersWrapper = document.querySelector('.filters-wrapper') as HTMLElement;
    const inventoryList = document.querySelector(tableSelector) as HTMLElement;
  
    if (!filtersWrapper || !inventoryList) {
      console.error('לא נמצאו אלמנטים להדפסה');
      return;
    }
  
    // חילוץ ערכי הסינון
    const yearFilter = (filtersWrapper.querySelector('input[placeholder="הכנס שנה"]') as HTMLInputElement)?.value || 'לא סונן';
    const councilFilter = (filtersWrapper.querySelector('input[placeholder="הכנס לשכה"]') as HTMLInputElement)?.value || 'לא סונן';
  
    // שכפול הטבלה
    const inventoryClone = inventoryList.cloneNode(true) as HTMLElement;
  
    // הסרת עמודת ה-"Actions" מהטבלה
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
        cells[cells.length - 1].remove(); // הסרת התא האחרון (עמודת ה-Actions)
      }
    });
  
    // פתיחת חלון ההדפסה
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
                direction: rtl; /* מימין לשמאל */
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
                text-align: right; /* יישור לימין */
              }
              th {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body>
            <div class="filters-summary">
              <p>סינון לפי שנה: ${yearFilter}</p>
              <p>סינון לפי לשכה: ${councilFilter}</p>
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
  }
  
  
}
