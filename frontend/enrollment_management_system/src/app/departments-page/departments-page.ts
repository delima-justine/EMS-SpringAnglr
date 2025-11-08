import { Component, inject, OnInit, signal } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Department } from '../../models/ems.model';
import { DepartmentService } from '../../service/department.service';
import { AddDeptModal } from "./add-dept-modal/add-dept-modal";

@Component({
  selector: 'app-departments-page',
  imports: [TopNav, AddDeptModal],
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

  // Updates the departments list through the child component's output
  onDepartmentAdded(createdDepartment: Department) {
    this.departments.update(list => [...list, createdDepartment]);
  }
}
