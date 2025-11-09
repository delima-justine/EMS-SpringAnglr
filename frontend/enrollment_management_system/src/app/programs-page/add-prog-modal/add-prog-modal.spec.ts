import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgModal } from './add-prog-modal';

describe('AddProgModal', () => {
  let component: AddProgModal;
  let fixture: ComponentFixture<AddProgModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProgModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProgModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
