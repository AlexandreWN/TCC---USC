import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SprintDialogComponent } from './components/sprint-dialog/sprint-dialog';
import { StoryDialogComponent } from './components/story-dialog/story-dialog';
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
  sprintId!:number;

  queryCommandProject!: Promise<any>;
  queryCommandSprint!: Promise<any>;
  queryCommandStory!: Promise<any>;

  constructor(
    private readonly dialog: MatDialog
    , private route: ActivatedRoute
    ){
      this.route.queryParams.subscribe(params => {
        this.projectId = params['id'];
        this.queryCommandProject = AxiosEndpoint.project.getById(this.projectId)
        this.queryCommandSprint = AxiosEndpoint.sprint.getSprintLikeProjectId(this.projectId);
      });
  }

  ngOnInit() {
    
  }

  name!: string;


  openDialogSprint(): void {
    const dialogRef = this.dialog.open(SprintDialogComponent, 
      {data: this.projectId}
    );

    dialogRef.afterClosed().subscribe(result => {
      this.queryCommandSprint = AxiosEndpoint.sprint.getSprintLikeProjectId(this.projectId);
    });
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
    localStorage.setItem('sprintId', JSON.stringify(option))
    this.sprintId = option;
    this.queryCommandStory = AxiosEndpoint.story.getStoryBySprintId(option)
  }

  openDialogStory(): void {
    const dialogRef = this.dialog.open(StoryDialogComponent, {data: this.sprintId});

    dialogRef.afterClosed().subscribe(result => {
      this.queryCommandStory = AxiosEndpoint.story.getStoryBySprintId(this.sprintId)
    });
  }
}