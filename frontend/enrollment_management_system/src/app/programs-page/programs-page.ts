import { Component, inject, OnInit, signal } from '@angular/core';
import { TopNav } from "../top-nav/top-nav";
import { Program } from '../../models/ems.model';
import { ProgramService } from '../../service/program.service';
import { AddProgModal } from "./add-prog-modal/add-prog-modal";

@Component({
  selector: 'app-programs-page',
  imports: [TopNav, AddProgModal],
  templateUrl: './programs-page.html',
  styleUrl: './programs-page.scss',
})
export class ProgramsPage implements OnInit {
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
  }
}
