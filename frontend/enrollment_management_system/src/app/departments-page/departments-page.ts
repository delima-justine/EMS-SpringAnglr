import { Component, inject, OnInit, signal } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Department } from '../../models/ems.model';
import { DepartmentService } from '../../service/department.service';

@Component({
  selector: 'app-departments-page',
  imports: [TopNav],
  templateUrl: './departments-page.html',
  styleUrl: './departments-page.scss',
})
export class DepartmentsPage implements OnInit {
  departments = signal(<Department[]>[]);
  departmentService = inject(DepartmentService);

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments()
      .subscribe(departmentsData => {
        this.departments.set(departmentsData);
      })
  }
}
