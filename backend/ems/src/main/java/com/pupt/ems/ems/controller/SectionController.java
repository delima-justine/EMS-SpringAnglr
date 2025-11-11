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
import com.pupt.ems.ems.model.Section;
import com.pupt.ems.ems.repository.SectionRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class SectionController {

  @Autowired
  private SectionRepository sectionRepository;

  // Working: Get All Sections
  @GetMapping("/sections")
  public List<Section> getAllSections() {
    return sectionRepository.findAllActiveSections();
  }

  // Working: Get Sections by Section ID
  @GetMapping("/sections/{id}")
  public ResponseEntity<Section> getSectionById(@PathVariable Integer id) {
    Section existingSection = sectionRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Section Not Found"));

    return ResponseEntity.ok(existingSection);
  }

  // Working: Create/Add New Section
  @PostMapping("/sections")
  public Section createNewSection(@RequestBody Section section) {
    return sectionRepository.save(section);
  }

  // Working: Update Section
  @PutMapping("/sections/{id}")
  public ResponseEntity<Section> updateSection(@PathVariable Integer id,
    @RequestBody Section sectionData)
  {
    Section existingSection = sectionRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Section Not Found"));

    existingSection.setSectionCode(sectionData.getSectionCode());
    existingSection.setCourseId(sectionData.getCourseId());
    existingSection.setTermId(sectionData.getTermId());
    existingSection.setInstructorId(sectionData.getInstructorId());
    existingSection.setDayPattern(sectionData.getDayPattern());
    existingSection.setStartTime(sectionData.getStartTime());
    existingSection.setEndTime(sectionData.getEndTime());
    existingSection.setRoomId(sectionData.getRoomId());
    existingSection.setMaxCapacity(sectionData.getMaxCapacity());

    Section updatedSection = sectionRepository.save(existingSection);
    return ResponseEntity.ok(updatedSection);
  }

  // Working: Soft Delete Section
  @DeleteMapping("/sections/{id}")
  public ResponseEntity<Map<String, Boolean>> deleteSection(@PathVariable Integer id) {
    sectionRepository.softDeleteById(id);
    Map<String, Boolean> response = Map.of("deleted", Boolean.TRUE);
    return ResponseEntity.ok(response);
  }

  // Search Sections by Section Code
  @GetMapping("/sections/search")
  public List<Section> searchSectionsByCode(@RequestParam String keyword) {
    return sectionRepository.searchSectionsByCode(keyword);
  }
}
