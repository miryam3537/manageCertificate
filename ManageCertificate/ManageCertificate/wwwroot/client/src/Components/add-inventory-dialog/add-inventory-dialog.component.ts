import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; // ייבוא MatSelectModule

@Component({
  selector: 'app-add-inventory-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule, // הוספת MatSelectModule ל-imports
  ],
  template: `
  <h2 mat-dialog-title>הוספת מלאי חדש</h2>
<mat-dialog-content>
  <form #inventoryForm="ngForm">
    <mat-form-field appearance="fill" class="dialog-input">
      <mat-label>בחר תעודה</mat-label>
      <mat-select [(ngModel)]="data.certificateId" name="certificateId" required #certificateId="ngModel">
        <mat-option *ngFor="let certificate of certificateTypes" [value]="certificate.id">
          {{ certificate.name }}
        </mat-option>
      </mat-select>
      <mat-error *ngIf="certificateId.invalid && certificateId.touched">יש לבחור תעודה</mat-error>
    </mat-form-field>

    <mat-form-field appearance="fill" class="dialog-input">
      <mat-label>שנה</mat-label>
      <input matInput type="number" [(ngModel)]="data.year" name="year" required min="1900" #year="ngModel" />
      <mat-error *ngIf="year.invalid && year.touched">
        <span *ngIf="year.errors?.['required']">יש להזין שנה</span>
        <span *ngIf="year.errors?.['min']">השנה חייבת להיות גדולה מ-2000</span>
      </mat-error>
    </mat-form-field>

    <mat-form-field appearance="fill" class="dialog-input">
      <mat-label>מלאי</mat-label>
      <input matInput type="number" [(ngModel)]="data.inventory" name="inventory" required min="1" #inventory="ngModel" />
     <mat-error *ngIf="inventory.invalid && inventory.touched">
  <span *ngIf="inventory.errors?.['required']">יש להזין מלאי</span>
  <span *ngIf="inventory.errors?.['min']">המלאי חייב להיות לפחות 100</span>
</mat-error>
    </mat-form-field>
  </form>
</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button (click)="onCancel()">ביטול</button>
  <button mat-button color="primary" [disabled]="inventoryForm.invalid" (click)="onSave()">שמור</button>
</mat-dialog-actions>
  `,
  styles: [`
    .dialog-input {
      width: 100%;
      margin-bottom: 10px;
    }
  `]
})
export class AddInventoryDialogComponent {
  certificateTypes: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddInventoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.certificateTypes = data.certificateTypes; // קבלת רשימת סוגי התעודה
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.data.certificateId && this.data.year && this.data.inventory) {
      this.dialogRef.close(this.data);
    } else {
      console.error('All fields are required');
    }
  }
}
