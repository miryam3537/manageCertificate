import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-inventory-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
 
  template: `
    <h2 mat-dialog-title>הוספת מלאי חדש</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill" class="dialog-input">
        <mat-label>מזהה תעודה</mat-label>
        <input matInput type="number" [(ngModel)]="data.certificateId" />
      </mat-form-field>
      <mat-form-field appearance="fill" class="dialog-input">
        <mat-label>שנה</mat-label>
        <input matInput type="number" [(ngModel)]="data.year" />
      </mat-form-field>
      <mat-form-field appearance="fill" class="dialog-input">
        <mat-label>מלאי</mat-label>
        <input matInput type="number" [(ngModel)]="data.inventory" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">ביטול</button>
      <button mat-button color="primary" (click)="onSave()">שמור</button>
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
  data = {
    certificateId: null,
    year: new Date().getFullYear(),
    inventory: null,
  };

  constructor(public dialogRef: MatDialogRef<AddInventoryDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}