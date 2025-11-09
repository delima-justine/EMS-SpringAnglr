import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSectionModal } from './update-section-modal';

describe('UpdateSectionModal', () => {
  let component: UpdateSectionModal;
  let fixture: ComponentFixture<UpdateSectionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSectionModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSectionModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
