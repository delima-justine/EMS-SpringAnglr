import { Component, ElementRef, inject, OnChanges, OnInit, signal, ViewChild } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Backend } from '../../service/backend';
import { Course } from '../../models/ems.model';
import { ActivatedRoute, Router } from "@angular/router";
import { AddModal } from "./add-modal/add-modal";
import { UpdateModal } from "./update-modal/update-modal";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-courses-page',
  imports: [TopNav, AddModal, UpdateModal],
  templateUrl: './courses-page.html',
  styleUrl: './courses-page.scss',
})
export class CoursesPage implements OnInit {
  @ViewChild('sortOrder') sortOrder!: ElementRef
  courses = signal(<Course[]>[]);
  courseIdSent = signal<number>(0);
  backendService = inject(Backend);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  // On component initialization, set up route param 
  // subscription and fetch courses
  ngOnInit(): void {
    this.getCourses();
  }

  // Fetches the list of courses from the backend
  getCourses() {
    this.backendService.getCourses()
      .subscribe(coursesData => {
        this.courses.set(coursesData);
    });
  }

  // Adds the newly created course to the courses list
  onCourseSaved(createdCourse: Course) {
    this.courses.update(list => [...list, createdCourse]);
    this.getCourses();
  }

  // Updates the course in the courses list after an update
  onCourseUpdated(updatedCourse: Course) {
    this.courses.update(list => list.map(course => 
      course.courseId === updatedCourse.courseId ? updatedCourse : course
    ));
    this.getCourses();
  }

  deleteCourse(courseId: number) {
    this.backendService.deleteCourse(courseId)
      .subscribe(() => {
        this.courses.update(
            list => list.filter(course => course.courseId !== courseId)
        );
      });
  }

  searchCourses(query: string) {
    console.log("Searching for:", query);
    this.backendService.searchCourses(query)
      .subscribe(coursesData => {
        this.courses.set(coursesData);
    });
  }

  sortCourses() {
    const order = this.sortOrder.nativeElement.value;

    switch(order) {
      case "asc":
        this.backendService.sortCoursesAsc()
          .subscribe(coursesData => {
            this.courses.set(coursesData);
          });
        break;
      case "desc":
        this.backendService.sortCoursesAsc()
          .subscribe(coursesData => {
            this.courses.set(coursesData.reverse());
          });
        break;
    }
  }

  exportToPDF() {
    console.log("Exporting to PDF...");
    const doc = new jsPDF({ 
      unit: 'pt', format: 'letter', orientation: 'landscape'
    });

    const columns = ['#', 'Course Code', 'Course Title', 'Units', 'Lecture Hrs', 
        'Lab Hrs', 'Dept ID'];
    const rows = this.courses().map((c, i) => [
      (i + 1).toString(),
      c.courseCode ?? '',
      c.courseTitle ?? '',
      (c.units ?? '').toString(),
      (c.lectureHours ?? '').toString(),
      (c.labHours ?? '').toString(),
      (c.departmentId ?? '').toString()
    ]);

    const title = 'Polytechnic University of the Philippines Taguig Campus - Course List';
    doc.setFontSize(20);

    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const x = (pageWidth - textWidth) / 2;
    doc.text(title, x, 40);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 60,
      margin: { left: 40, right: 40 },
      styles: { fontSize: 10 },
      headStyles: { fillColor: [102, 34, 34], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      tableLineWidth: 0.5
    });

    doc.save('courses.pdf');
  }

  exportToExcel() {
    console.log("Exporting to Excel...");
  }
}
