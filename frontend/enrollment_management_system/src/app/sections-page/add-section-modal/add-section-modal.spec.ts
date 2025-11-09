import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSectionModal } from './add-section-modal';

describe('AddSectionModal', () => {
  let component: AddSectionModal;
  let fixture: ComponentFixture<AddSectionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSectionModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSectionModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
