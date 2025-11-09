import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentModal } from './add-student-modal';

describe('AddStudentModal', () => {
  let component: AddStudentModal;
  let fixture: ComponentFixture<AddStudentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStudentModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
