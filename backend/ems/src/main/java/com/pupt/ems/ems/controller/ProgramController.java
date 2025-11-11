package com.pupt.ems.ems.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.pupt.ems.ems.exception.ResourceNotFoundException;
import com.pupt.ems.ems.model.Program;
import com.pupt.ems.ems.repository.ProgramRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ProgramController {

  @Autowired
  private ProgramRepository programRepository;

  // Working: Get All Programs
  @GetMapping(value = "/programs")
  public List<Program> getAllPrograms() {
    return programRepository.getAllExistingPrograms();
  }

  // Working: Create/Add new Program
  @PostMapping(value = "/programs")
  public Program createProgram(@RequestBody Program program) {
    return programRepository.save(program);
  }

  // Working: Get Program by ID
  @GetMapping(value = "/programs/{id}")
  public ResponseEntity<Program> getProgramById(@PathVariable Integer id) {
    Program program = programRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Program not found with id :" + id));
    return ResponseEntity.ok(program);
  }

  // Working: Update Program by ID
  @PutMapping(value = "/programs/{id}")
  public ResponseEntity<Program> updateProgram(
    @PathVariable Integer id, @RequestBody Program programData)
  {
    Program program = programRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException(
        "Program not found with id :" + id));

    program.setProgramCode(programData.getProgramCode());
    program.setProgramName(programData.getProgramName());
    program.setDepartmentId(programData.getDepartmentId());

    Program updatedProgram = programRepository.save(program);
    return ResponseEntity.ok(updatedProgram);
  }

  // Working: Soft Delete Program by ID
  @DeleteMapping("/programs/{id}")
  public ResponseEntity<Map<String, Boolean>> deleteProgram(@PathVariable Integer id) {
    programRepository.softDeleteById(id);
    return ResponseEntity.ok(Map.of("deleted", Boolean.TRUE));
  }

  @GetMapping("/programs/search")
  public List<Program> searchPrograms(@RequestParam String keyword) {
    return programRepository.searchProgramsByCodeOrName(keyword);
  }

  @GetMapping("/programs/asc")
  public List<Program> getProgramsAsc() {
    return programRepository.getAllExistingProgramsAsc();
  }
}
