import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Department } from '../models/ems.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private deptUrl = "http://localhost:8080/api/departments";
  http = inject(HttpClient);

  getDepartments() {
    return this.http.get<Department[]>(this.deptUrl);
  }

  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.deptUrl}/${id}`);
  }

  addDepartment(department: Department) {
    return this.http.post<Department>(this.deptUrl, department);
  }

  updateDepartment(id: number, department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.deptUrl}/${id}`, department);
  }

  deleteDepartment(id: number): Observable<Department> {
    return this.http.delete<Department>(`${this.deptUrl}/${id}`);
  }
}
