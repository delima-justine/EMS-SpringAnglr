import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEnrollmentModal } from './update-enrollment-modal';

describe('UpdateEnrollmentModal', () => {
  let component: UpdateEnrollmentModal;
  let fixture: ComponentFixture<UpdateEnrollmentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEnrollmentModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEnrollmentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
