import { Component, inject, OnInit, signal } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Student } from '../../models/ems.model';
import { StudentService } from '../../service/student.service';
import { AddStudentModal } from "./add-student-modal/add-student-modal";
import { UpdateStudentModal } from "./update-student-modal/update-student-modal";

@Component({
  selector: 'app-students-page',
  imports: [TopNav, AddStudentModal, UpdateStudentModal],
  templateUrl: './students-page.html',
  styleUrl: './students-page.scss',
})
export class StudentsPage implements OnInit {
  students = signal(<Student[]>[]);
  studentService = inject(StudentService);

  ngOnInit(): void {
    this.getStudents();
  }

  // Get all students
  getStudents() {
    this.studentService.getStudent().subscribe(students => {
      this.students.set(students);
    });
  }

  // Soft delete student data
  deleteStudent(studentId: number) {
    this.studentService.deleteStudent(studentId).subscribe(() => {
      this.getStudents();
    });
  }  

  // Handle the event emitted from AddStudentModal component
  onStudentAdded(newStudent: Student) {
    this.students.update(student => [...student, newStudent]);
  }

  // Handle the event emitted from UpdateStudentModal component
  onStudentUpdated(updatedStudent: Student) {
    this.students.update(students => 
      students.map(student => 
        student.studentId === updatedStudent.studentId ? updatedStudent : student
      )
    );
  }
}
