import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoryDto } from 'src/app/dtos/story-dto/story-dto';
import { UserDto } from 'src/app/dtos/user-dto/user-dto';
import { AxiosEndpoint } from 'src/app/utils/query-services';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-project-work-page',
  templateUrl: './story-dialog.html',
  styleUrls: ['./story-dialog.scss']
})
export class StoryDialogComponent implements OnInit{
  mainForm: FormGroup = new FormGroup({})
  
  submitCommand!: Promise<any>;

  user!: UserDto;
  sprintId!: number;
  story!: StoryDto;

  constructor(
    public dialogRef: MatDialogRef<StoryDialogComponent>,
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
    this.mainForm.addControl("idSprint", new FormControl(this.data));
  }

  submitRegister(){
    if(this.sprintId !== null){
      this.story = StoryDto.createFromFormValues(this.mainForm.value)
      this.submitCommand = AxiosEndpoint.story.register(this.story);

      this.submitCommand.then(result => {
        if(result && result.length !== 0) {
          this.dialogRef.close();
          alert("Story cadastrado com sucesso")
        }
      }).catch(error => {
        alert("Erro ao cadastrar Story "+error)
      });
    }
  }
}
