import { ResourceLoader } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDto } from 'src/app/dtos/user-dto/user-dto';
import { AxiosEndpoint } from 'src/app/utils/query-services';

@Component({
  selector: 'app-project-work-page',
  templateUrl: './colaborador-dialog.html',
  styleUrls: ['./colaborador-dialog.scss']
})

export class ColaboradorDialogComponent implements OnInit{
  mainForm: FormGroup = new FormGroup({})

  submitCommand!: Promise<any>;

  user!: UserDto;

  constructor(
    public dialogRef: MatDialogRef<ColaboradorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createFormGroup(){
    this.mainForm.addControl("name", new FormControl("", [Validators.required]));
    this.mainForm.addControl("description", new FormControl("", [Validators.required]));
    this.mainForm.addControl("creationDate", new FormControl(new Date));
    this.mainForm.addControl("initionDate", new FormControl("", [Validators.required]));
    this.mainForm.addControl("endDate", new FormControl("", [Validators.required]));
    this.mainForm.addControl("idProject", new FormControl(this.data));
  }

  submitRegister(){
    this.user = UserDto.createFromFormValues(this.mainForm.value);

    this.submitCommand = AxiosEndpoint.user.register(this.user);

    this.submitCommand.then(result => {
      if(result && result.length !== 0) {
        this.dialogRef.close();
        alert("Colaborador cadastrado com sucesso")
      }
    }).catch(error => {
      alert("Erro ao cadastrar Colaborador "+error)
    });
  }
}