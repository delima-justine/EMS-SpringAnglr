import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Term } from '../../models/ems.model';
import { TermsService } from '../../service/terms.service';
import { AddTermModal } from "./add-term-modal/add-term-modal";
import { UpdateTermModal } from "./update-term-modal/update-term-modal";

@Component({
  selector: 'app-terms-page',
  imports: [TopNav, AddTermModal, UpdateTermModal],
  templateUrl: './terms-page.html',
  styleUrl: './terms-page.scss',
})
export class TermsPage implements OnInit {
  @ViewChild('sortOrder') sortOrder!: ElementRef;
  terms = signal(<Term[]>[]);
  termService = inject(TermsService);

  ngOnInit(): void {
    this.getTerms();
  }

  getTerms() {
    this.termService.getTerms().subscribe((data) => {
      this.terms.set(data);
    });
  }

  deleteTerm(termId: number) {
    this.termService.deleteTerm(termId).subscribe(() => {
      this.getTerms();
    });
  }

  onTermAdded(term: Term) {
    this.terms.update((currentTerms) => [...currentTerms, term]);
  }

  onTermUpdated(updatedTerm: Term) {
    this.terms.update((currentTerms) => currentTerms.map((term) => 
      term.termId === updatedTerm.termId ? updatedTerm : term));
  }

  searchTerms(keyword: string) {
    this.termService.searchTerms(keyword).subscribe((searchedTerms) => {
      this.terms.set(searchedTerms);
    });
  }

  sortTerms() {
    const order = this.sortOrder.nativeElement.value;

    switch(order) {
      case 'asc':
        this.termService.sortTermsAsc().subscribe((sortedTerms) => {
          this.terms.set(sortedTerms);
        });
        break;
      case 'desc':
        this.termService.sortTermsAsc().subscribe((sortedTerms) => {
          this.terms.set(sortedTerms.reverse());
        });
        break;
    }
  }
}
