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
  },
  { 
    path: 'departments', loadComponent: () => import(
    './departments-page/departments-page').then(m => m.DepartmentsPage)
  },
  { 
    path: 'enrollments', loadComponent: () =>
     import('./enrollments-page/enrollments-page').then(m => m.EnrollmentsPage),
  },
  {
    path: 'instructors', loadComponent: () => import(
      './instructors-page/instructors-page').then(m => m.InstructorsPage),
  },
  {
    path: 'programs', loadComponent: () => import(
      './programs-page/programs-page').then(m => m.ProgramsPage)
  },
  {
    path: 'rooms', loadComponent: () => import(
      './rooms-page/rooms-page').then(m => m.RoomsPage)
  },
  {
    path: 'sections', loadComponent: () => import(
      './sections-page/sections-page').then(m => m.SectionsPage)
  },
  {
    path: 'students', loadComponent: () => import(
      './students-page/students-page').then(m => m.StudentsPage)
  },
  {
    path: 'terms', loadComponent: () => import(
      './terms-page/terms-page').then(m => m.TermsPage)
  }
];
