import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing-page/landing-page')
      .then(m => m.LandingPage) 
  },
  {
    path: 'courses', loadComponent: () => import('./courses-page/courses-page')
      .then(m => m.CoursesPage)
  },
  {
    path: 'course-prerequisites', loadComponent: () => import(
      './course-prerequisites-page/course-prerequisites-page')
        .then(m => m.CoursePrerequisitesPage)
  }
];
