import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProjectDto } from 'src/app/dtos/project-dto/project-dto';
import { UserDto } from 'src/app/dtos/user-dto/user-dto';
import { UserProjectDto } from 'src/app/dtos/user-project-dto/user-project-dto';
import { AxiosEndpoint } from 'src/app/utils/query-services';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-initial-page',
  templateUrl: './add-project-dialog.html',
  styleUrls: ['./add-project-dialog.scss']
})

export class AddProjectDialogComponent implements OnInit{
  mainForm: FormGroup = new FormGroup({})
  
  queryCommand!: Promise<any>;
  queryCommandUserProject!: Promise<any>;

  project!: ProjectDto;
  userProject!: UserProjectDto;
  user!: UserDto;
  
  animal!: string;
  name!: string;

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createFormGroup(){
    this.mainForm.addControl("name", new FormControl("", [Validators.required]));
    this.mainForm.addControl("urlImage", new FormControl("", [Validators.required]));
    this.mainForm.addControl("description", new FormControl("",  [Validators.required]));
  }

  submitRegister(){
    this.user = JSON.parse(localStorage.getItem('user') ?? "");
    if(this.user !== undefined){
      this.project = ProjectDto.createFromFormValues(this.mainForm.value)
  
      this.queryCommand = AxiosEndpoint.project.register(this.project)
      
      this.queryCommand.then(result => {
        this.userProject = <UserProjectDto> {
          idUser: this.user.id,
          idProject: result,
          userType: "adm",
          availabilityTime: 0,
        };

        if(result && result.length !== 0) {
          this.queryCommandUserProject = AxiosEndpoint.userProject.register(this.userProject)
          this.queryCommandUserProject.then(result => {
            if(result && result.length !== 0) {
              this.dialogRef.close();
              alert("Projeto cadastrado com sucesso")
            }
          }).catch(error => {
            alert("Erro ao cadastrar projeto "+error)
          });
        }
      }).catch(error => {
        alert("Erro ao cadastrar projeto "+error)
      });
    }
    else{
      alert("Usuario não encontrado");
    }
  }

  openDialogAddProject(): void {
    const dialogRef = this.dialog.open(AddProjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }
}


