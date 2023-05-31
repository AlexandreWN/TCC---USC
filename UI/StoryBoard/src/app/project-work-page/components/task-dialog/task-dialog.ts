import { ResourceLoader } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasktDto } from 'src/app/dtos/task-dto/task-dto';
import { UserDto } from 'src/app/dtos/user-dto/user-dto';
import { AxiosEndpoint } from 'src/app/utils/query-services';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-project-work-page',
  templateUrl: './task-dialog.html',
  styleUrls: ['./task-dialog.scss']
})
export class TaskDialogComponent implements OnInit{
  mainForm: FormGroup = new FormGroup({})
  
  submitCommand!: Promise<any>;

  user!: UserDto;
  storyID!: number;
  task!: TasktDto;

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
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
    this.mainForm.addControl("endDate", new FormControl("", [Validators.required]));
    this.mainForm.addControl("durationTime", new FormControl("", [Validators.required]));
    this.mainForm.addControl("status", new FormControl("", [Validators.required]));
    this.mainForm.addControl("idSprint", new FormControl(this.data));
  }

  submitRegister(){
    if(this.storyID !== null){
      this.task = TasktDto.createFromFormValues(this.mainForm.value)
      this.submitCommand = AxiosEndpoint.task.register(this.task);

      this.submitCommand.then(result => {
        if(result && result.length !== 0) {
          this.dialogRef.close();
          alert("Task cadastrado com sucesso")
        }
      }).catch(error => {
        alert("Erro ao cadastrar Task "+error)
      });
    }
  }
}
