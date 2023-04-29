import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, LoginDialogComponent } from 'src/app/presentation-page/components/login-dialog/login-dialog';

@Component({
  selector: 'app-story-dialog',
  templateUrl: './story-dialog.component.html',
  styleUrls: ['./story-dialog.component.scss']
})
export class StoryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
