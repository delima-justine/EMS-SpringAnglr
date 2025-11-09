import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentModal } from './update-student-modal';

describe('UpdateStudentModal', () => {
  let component: UpdateStudentModal;
  let fixture: ComponentFixture<UpdateStudentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStudentModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStudentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
