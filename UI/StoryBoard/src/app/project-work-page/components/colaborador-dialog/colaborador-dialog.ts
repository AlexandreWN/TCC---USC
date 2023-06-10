import { ResourceLoader } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamDto } from 'src/app/dtos/user-dto/team-dto';
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

  team!: TeamDto;

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
    this.mainForm.addControl("userEmail", new FormControl("", [Validators.required]));
    this.mainForm.addControl("idProject", new FormControl(this.data));
    this.mainForm.addControl("userType", new FormControl("team"));
    this.mainForm.addControl("availabilityTime", new FormControl(0));
  }

  submitRegister(){
    this.team = TeamDto.createFromFormValues(this.mainForm.value);

    this.submitCommand = AxiosEndpoint.userProject.registerTeam(this.team);

    this.submitCommand.then(result => {
      if(result && result.length !== 0) {
        this.dialogRef.close();
        alert("Colaborador cadastrado com sucesso")
      }
    }).catch(error => {
      alert("Email de usuario inexistente")
    });
  }
}