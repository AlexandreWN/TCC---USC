import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../presentation-page/components/login-dialog/login-dialog';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog';

@Component({
  selector: 'app-presentation-page',
  templateUrl: './presentation-page.component.html',
  styleUrls: ['./presentation-page.component.scss']
})
export class PresentationPageComponent {
  animal!: string;
  name!: string;

  constructor(private readonly dialog: MatDialog){}
  openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }
  openDialogRegister(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

}
