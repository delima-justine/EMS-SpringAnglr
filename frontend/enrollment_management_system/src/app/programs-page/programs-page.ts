import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Program } from '../../models/ems.model';
import { ProgramService } from '../../service/program.service';
import { AddProgModal } from "./add-prog-modal/add-prog-modal";
import { UpdateProgModal } from "./update-prog-modal/update-prog-modal";

@Component({
  selector: 'app-programs-page',
  imports: [TopNav, AddProgModal, UpdateProgModal],
  templateUrl: './programs-page.html',
  styleUrl: './programs-page.scss',
})
export class ProgramsPage implements OnInit {
  @ViewChild('sortOrder') sortOrder!: ElementRef
  programs = signal(<Program[]>[])
  programService = inject(ProgramService);

  ngOnInit(): void {
    this.getPrograms();
  }

  // Fetch Programs
  getPrograms() {
    this.programService.getPrograms().subscribe((programs) => {
      this.programs.set(programs);
    });
  }

  // Soft Delete Program
  deleteProgram(programId: number) {
    this.programService.deleteProgram(programId).subscribe(() => {
      this.getPrograms();
    });
  }

  // Handle Add Program Modal Response
  onProgramAdded(newProgram: Program) {
    this.programs.update((programs) => [...programs, newProgram]);
    this.getPrograms();
  }

  //Handle Update Program Modal Response
  onProgramUpdated(updatedProgram: Program) {
    this.programs.update((programs) => programs.map((program) => 
      program.programId === updatedProgram.programId ? updatedProgram : program
    ));

    this.getPrograms();
  }

  searchPrograms(keyword: string) {
    this.programService.searchPrograms(keyword)
      .subscribe((searchedPrograms) => {
        this.programs.set(searchedPrograms);
    });
  }

  sortPrograms() {
    const order = this.sortOrder.nativeElement.value;

    switch(order) {
      case 'asc':
        this.programService.sortProgramsAsc()
          .subscribe((sortedPrograms) => {
            this.programs.set(sortedPrograms);
          });
        break;
      case 'desc':
        this.programService.sortProgramsAsc()
          .subscribe((sortedPrograms) => {
            this.programs.set(sortedPrograms.reverse());
          });
        break;
    }
  }
}
