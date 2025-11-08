import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnrollmentModal } from './add-enrollment-modal';

describe('AddEnrollmentModal', () => {
  let component: AddEnrollmentModal;
  let fixture: ComponentFixture<AddEnrollmentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEnrollmentModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEnrollmentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
