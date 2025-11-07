import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCpModal } from './add-cp-modal';

describe('AddCpModal', () => {
  let component: AddCpModal;
  let fixture: ComponentFixture<AddCpModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCpModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCpModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
