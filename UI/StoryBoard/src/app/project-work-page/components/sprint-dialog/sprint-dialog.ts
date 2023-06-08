import { ResourceLoader } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SprintDto } from 'src/app/dtos/sprint-dto/sprint-dto';
import { UserDto } from 'src/app/dtos/user-dto/user-dto';
import { AxiosEndpoint } from 'src/app/utils/query-services';

@Component({
  selector: 'app-project-work-page',
  templateUrl: './sprint-dialog.html',
  styleUrls: ['./sprint-dialog.scss']
})

export class SprintDialogComponent implements OnInit{
  mainForm: FormGroup = new FormGroup({})

  submitCommand!: Promise<any>;

  sprint!: SprintDto;

  constructor(
    public dialogRef: MatDialogRef<SprintDialogComponent>,
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
    this.sprint = SprintDto.createFromFormValues(this.mainForm.value);

    this.submitCommand = AxiosEndpoint.sprint.register(this.sprint);

    this.submitCommand.then(result => {
      if(result && result.length !== 0) {
        this.dialogRef.close();
        alert("Sprint cadastrado com sucesso")
      }
    }).catch(error => {
      alert("Erro ao cadastrar Sprint "+error)
    });
  }
}