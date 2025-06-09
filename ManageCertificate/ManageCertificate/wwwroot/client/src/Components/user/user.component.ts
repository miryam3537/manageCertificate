import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [MatTableModule,FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private dialog: MatDialog) {}
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  users = [
    { id: 1, name: 'יוסי כהן', email: 'yossi@example.com' },
    { id: 2, name: 'רונית לוי', email: 'ronit@example.com' },
    { id: 3, name: 'דני ישראלי', email: 'dani@example.com' }
  ];
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User added:', result);
        // כאן תוכל להוסיף את המשתמש לשרת או לרשימה המקומית
      }
    });
  }
  openEditUserDialog(user: any): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: { ...user } // העברת הנתונים של המשתמש לדיאלוג
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User edited:', result);
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users[index] = result; // עדכון המשתמש ברשימה
        }
      }
    });
  }

  deleteUser(){

  }

}
