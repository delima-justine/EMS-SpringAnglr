import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Backend } from '../../service/backend';
import { Course } from '../../models/ems.model';

@Component({
  selector: 'app-courses-page',
  imports: [TopNav],
  templateUrl: './courses-page.html',
  styleUrl: './courses-page.scss',
})
export class CoursesPage implements OnInit, AfterViewInit {
  courses = signal(<Course[]>[]);
  backendService = inject(Backend);

  ngOnInit(): void {
    this.getCourses();
  }

  ngAfterViewInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.backendService.getCourses()
      .subscribe(coursesData => {
        this.courses.set(coursesData);
    });
  }
}
