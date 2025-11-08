import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeptModal } from './update-dept-modal';

describe('UpdateDeptModal', () => {
  let component: UpdateDeptModal;
  let fixture: ComponentFixture<UpdateDeptModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDeptModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDeptModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
