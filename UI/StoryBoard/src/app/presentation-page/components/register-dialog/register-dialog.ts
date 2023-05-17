import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDto } from 'src/app/dtos/user-dto/user-dto';
import { AxiosEndpoint } from 'src/app/utils/query-services';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-presentation-page',
  templateUrl: './register-dialog.html',
  styleUrls: ['./register-dialog.scss']
})

export class RegisterDialogComponent implements OnInit{
  mainForm: FormGroup = new FormGroup({})
  
  queryCommand!: Promise<any>;

  user!: UserDto;

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createFormGroup(){
    this.mainForm.addControl("name", new FormControl("", [Validators.required]));
    this.mainForm.addControl("login", new FormControl("", [Validators.required]));
    this.mainForm.addControl("password", new FormControl("",  [Validators.required]));
    this.mainForm.addControl("repeatpassword", new FormControl("",  [Validators.required]));
  }

  submitRegister(){
    console.log(this.mainForm)
    if(this.mainForm.value.password === this.mainForm.value.repeatpassword){
      this.user = UserDto.createFromFormValues(this.mainForm.value)
   
      this.queryCommand = AxiosEndpoint.user.register(this.user)
      
      this.queryCommand.then(result => {
        if(result && result.length !== 0) {
          this.dialogRef.close();
          localStorage.setItem('user', JSON.stringify(result))
          alert("Usuario registrado com sucesso!")
        }
      }).catch(error => {
        alert("Login ou senha invalido")
      });
    }
    else{
      alert("As senhas devem ser iguais")
    }
  }
}
