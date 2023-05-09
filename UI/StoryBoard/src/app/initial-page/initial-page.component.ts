import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../presentation-page/components/login-dialog/login-dialog';
import { AxiosEndpoint } from '../utils/query-services';
import { ProjectDto } from '../utils/project-dto/project-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit{

  animal!: string;
  name!: string;

  queryCommandProjects!: Promise<any>;
  queryCommandTeamProjects!: Promise<any>;

  constructor(
      private readonly dialog: MatDialog
      , private _router: Router
    )
  {
    
  }

  ngOnInit(): void {
    this.queryCommandProjects = AxiosEndpoint.userProject.getAllByUserId(1, "adm")
    this.queryCommandTeamProjects = AxiosEndpoint.userProject.getAllByUserId(1, "team")
  }

  GoToProject(id: number){
    this._router.navigate(['project-work'], {queryParams: {id: id}})
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
