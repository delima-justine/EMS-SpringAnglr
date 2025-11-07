import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModal } from './add-modal';

describe('AddModal', () => {
  let component: AddModal;
  let fixture: ComponentFixture<AddModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
