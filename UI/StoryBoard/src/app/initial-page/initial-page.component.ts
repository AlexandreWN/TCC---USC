import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectDialogComponent } from './components/add-project-dialog/add-project-dialog';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent {
  
  animal!: string;
  name!: string;

  constructor(private readonly dialog: MatDialog){}
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
