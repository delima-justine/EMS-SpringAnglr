import { TestBed } from '@angular/core/testing';

import { CoursePrereqService } from './course-prereq.service';

describe('CoursePrereqService', () => {
  let service: CoursePrereqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursePrereqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
