import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-presentation-page',
  templateUrl: './login-dialog.html',
  styleUrls: ['./login-dialog.scss']
})

export class LoginDialogComponent {
  animal!: string;
  name!: string;
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private readonly dialog: MatDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialogRegister(): void {
    const dialogRef2 = this.dialog.open(RegisterDialogComponent);
    this.dialogRef.close();

    dialogRef2.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}


