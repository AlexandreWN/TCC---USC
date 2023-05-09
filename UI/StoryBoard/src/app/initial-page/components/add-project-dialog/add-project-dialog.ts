import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-initial-page',
  templateUrl: './add-project-dialog.html',
  styleUrls: ['./add-project-dialog.scss']
})

export class AddProjectDialogComponent {
  animal!: string;
  name!: string;
  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private readonly dialog: MatDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialogAddProject(): void {
    const dialogRef = this.dialog.open(AddProjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}


