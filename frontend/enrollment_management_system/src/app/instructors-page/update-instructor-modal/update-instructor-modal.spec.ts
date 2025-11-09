import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInstructorModal } from './update-instructor-modal';

describe('UpdateInstructorModal', () => {
  let component: UpdateInstructorModal;
  let fixture: ComponentFixture<UpdateInstructorModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInstructorModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInstructorModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
