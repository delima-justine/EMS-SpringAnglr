import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Section } from '../models/ems.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  serviceUrl = 'http://localhost:8080/api/sections';
  http = inject(HttpClient);

  getSections() {
    return this.http.get<Section[]>(this.serviceUrl);
  } 

  getSectionById(sectionId: number): Observable<Section> {
    return this.http.get<Section>(`${this.serviceUrl}/${sectionId}`);
  }

  addSection(section: Section): Observable<Section> {
    return this.http.post<Section>(this.serviceUrl, section);
  }

  updateSection(sectionId: number, section: Section): Observable<Section> {
    return this.http.put<Section>(`${this.serviceUrl}/${sectionId}`, section);
  }

  deleteSection(sectionId: number): Observable<Section> {
    return this.http.delete<Section>(`${this.serviceUrl}/${sectionId}`);
  }

  searchSections(keyword: string): Observable<Section[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Section[]>(`${this.serviceUrl}/search`, { params });
  }

  sortSectionsAsc(): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.serviceUrl}/asc`);
  }
}
