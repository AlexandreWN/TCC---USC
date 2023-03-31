import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
