import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AxiosEndpoint } from '../utils/query-services';
import { Router } from '@angular/router';
import { AddProjectDialogComponent } from './components/add-project-dialog/add-project-dialog';
import { UserDto } from '../dtos/user-dto/user-dto';
@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit{

  animal!: string;
  name!: string;
  user!: UserDto;

  queryCommandProjects!: Promise<any>;
  queryCommandTeamProjects!: Promise<any>;

  constructor(
      private readonly dialog: MatDialog
      , private _router: Router
    )
  {
    
  }

  ngOnInit(): void {
    if(localStorage.getItem('user') ===  null){
      this._router.navigate([''])
    }
    else{
      this.user = JSON.parse(localStorage.getItem('user') ?? "");
      if(this.user !== undefined){
        this.queryCommandProjects = AxiosEndpoint.userProject.getAllByUserId(this.user.id, "adm")
        this.queryCommandTeamProjects = AxiosEndpoint.userProject.getAllByUserId(this.user.id, "team")
      }
    }
  }

  reset(){
    this.queryCommandProjects = AxiosEndpoint.userProject.getAllByUserId(this.user.id, "adm")
    this.queryCommandTeamProjects = AxiosEndpoint.userProject.getAllByUserId(this.user.id, "team")
  }

  GoToProject(id: number){
    this._router.navigate(['project-work'], {queryParams: {id: id}})
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
      this.reset();
    });
  }
}
