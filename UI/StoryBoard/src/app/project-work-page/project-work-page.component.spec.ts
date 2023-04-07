import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWorkPageComponent } from './project-work-page.component';

describe('ProjectWorkPageComponent', () => {
  let component: ProjectWorkPageComponent;
  let fixture: ComponentFixture<ProjectWorkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectWorkPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectWorkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
