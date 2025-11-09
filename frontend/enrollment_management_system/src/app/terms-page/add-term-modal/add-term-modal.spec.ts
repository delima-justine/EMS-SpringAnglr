import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTermModal } from './add-term-modal';

describe('AddTermModal', () => {
  let component: AddTermModal;
  let fixture: ComponentFixture<AddTermModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTermModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTermModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
