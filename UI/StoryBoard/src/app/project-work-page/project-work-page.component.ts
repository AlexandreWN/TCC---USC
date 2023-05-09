import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoryDialogComponent } from './components/story-dialog/story-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { AxiosEndpoint } from '../utils/query-services';

@Component({
  selector: 'app-project-work-page',
  templateUrl: './project-work-page.component.html',
  styleUrls: ['./project-work-page.component.scss']
})
export class ProjectWorkPageComponent {
  todo : Array<string> = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  inProgess : Array<string> = [];
  done : Array<string> = [];

  projectId!: number;

  queryCommandProject!: Promise<any>;

  constructor(
    private readonly dialog: MatDialog
    , private route: ActivatedRoute
    ){
      this.route.queryParams.subscribe(params => {
        this.projectId = params['id'];
        this.queryCommandProject = AxiosEndpoint.project.getById(this.projectId)
      });
  }

  ngOnInit() {
    
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onOptionSelected(option: number) {
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(StoryDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}