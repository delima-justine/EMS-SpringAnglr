import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Term } from '../models/ems.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TermsService {
  termUrl = "http://localhost:8080/api/terms";
  http = inject(HttpClient);

  getTerms() {
    return this.http.get<Term[]>(this.termUrl);
  }

  getTermById(id: number): Observable<Term> {
    return this.http.get<Term>(`${this.termUrl}/${id}`);
  }

  addTerm(term: Term): Observable<Term> {
    return this.http.post<Term>(this.termUrl, term);
  }

  updateTerm(id: number, term: Term): Observable<Term> {
    return this.http.put<Term>(`${this.termUrl}/${id}`, term);
  }

  deleteTerm(id: number): Observable<Term> {
    return this.http.delete<Term>(`${this.termUrl}/${id}`);
  }
  
  searchTerms(keyword: string): Observable<Term[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Term[]>(`${this.termUrl}/search`, { params });
  }
}
