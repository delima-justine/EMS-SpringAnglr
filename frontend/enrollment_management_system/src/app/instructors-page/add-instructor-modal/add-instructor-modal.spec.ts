import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstructorModal } from './add-instructor-modal';

describe('AddInstructorModal', () => {
  let component: AddInstructorModal;
  let fixture: ComponentFixture<AddInstructorModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInstructorModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInstructorModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
