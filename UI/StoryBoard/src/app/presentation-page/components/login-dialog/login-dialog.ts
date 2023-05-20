import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AxiosEndpoint } from 'src/app/utils/query-services';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-presentation-page',
  templateUrl: './login-dialog.html',
  styleUrls: ['./login-dialog.scss']
})

export class LoginDialogComponent implements OnInit{
  mainForm: FormGroup = new FormGroup({})

  queryCommand!: Promise<any>;

  animal!: string;
  name!: string;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>
    , @Inject(MAT_DIALOG_DATA) public data: DialogData
    , private readonly dialog: MatDialog
    , private _router: Router
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

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

  createFormGroup(){
    this.mainForm.addControl("login", new FormControl("", [Validators.required]));
    this.mainForm.addControl("password", new FormControl("",  [Validators.required]));
  }

  submitLogin(){
    console.log(this.mainForm)
    this.queryCommand = AxiosEndpoint.user.login(this.mainForm.value.login, this.mainForm.value.password)
    
    this.queryCommand.then(result => {
      if(result && result.length !== 0) {
        this.dialogRef.close();
        localStorage.setItem('user', JSON.stringify(result))
        this._router.navigate(['initial-page'])
      }
    }).catch(error => {
      alert(error)
    });
  }
}


