import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePrerequisitesPage } from './course-prerequisites-page';

describe('CoursePrerequisitesPage', () => {
  let component: CoursePrerequisitesPage;
  let fixture: ComponentFixture<CoursePrerequisitesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursePrerequisitesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursePrerequisitesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
