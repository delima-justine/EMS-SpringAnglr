import { Component, inject, OnInit, signal } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Section } from '../../models/ems.model';
import { SectionService } from '../../service/section.service';
import { AddSectionModal } from "./add-section-modal/add-section-modal";

@Component({
  selector: 'app-sections-page',
  imports: [TopNav, AddSectionModal],
  templateUrl: './sections-page.html',
  styleUrl: './sections-page.scss',
})
export class SectionsPage implements OnInit {
  sections = signal(<Section[]>[]);
  sectionService = inject(SectionService);

  // Fetch Sections on Component Initialization
  ngOnInit() {
    this.getSections();
  }

  // Fetch Sections
  getSections() {
    this.sectionService.getSections().subscribe(sections => {
      this.sections.set(sections);
    });
  }

  // Soft Delete Section
  deleteSection(sectionId: number) {
    this.sectionService.deleteSection(sectionId).subscribe(() => {
      this.getSections();
    });
  }

  // Handle Add Section Modal Response
  onSectionAdded(newSection: Section) {
    this.sections.update(sections => [...sections, newSection]);
  }
}
