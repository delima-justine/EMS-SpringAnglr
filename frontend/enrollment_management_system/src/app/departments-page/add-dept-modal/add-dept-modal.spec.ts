import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeptModal } from './add-dept-modal';

describe('AddDeptModal', () => {
  let component: AddDeptModal;
  let fixture: ComponentFixture<AddDeptModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDeptModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeptModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
