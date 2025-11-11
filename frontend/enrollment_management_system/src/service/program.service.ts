import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Program } from '../models/ems.model';
import { Observable, ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  programUrl = 'http://localhost:8080/api/programs';
  http = inject(HttpClient);

  getPrograms() {
    return this.http.get<Program[]>(this.programUrl);
  }

  getProgramById(programId: number): Observable<Program> {
    return this.http.get<Program>(`${this.programUrl}/${programId}`);
  }

  addProgram(program: Program): Observable<Program> {
    return this.http.post<Program>(this.programUrl, program);
  }

  updateProgram(programId: number, program: Program): Observable<Program> {
    return this.http.put<Program>(`${this.programUrl}/${programId}`, program);
  }

  deleteProgram(programId: number): Observable<Program> {
    return this.http.delete<Program>(`${this.programUrl}/${programId}`);
  }

  searchPrograms(keyword: string): Observable<Program[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Program[]>(`${this.programUrl}/search`, { params });
  }

  sortProgramsAsc(): Observable<Program[]> {
    return this.http.get<Program[]>(`${this.programUrl}/asc`);
  }
}
