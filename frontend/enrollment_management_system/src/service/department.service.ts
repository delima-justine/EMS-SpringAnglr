import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Department } from '../models/ems.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private deptUrl = "http://localhost:8080/api/departments";
  http = inject(HttpClient);

  getDepartments() {
    return this.http.get<Department[]>(this.deptUrl);
  }
}
