import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModal } from './update-modal';

describe('UpdateModal', () => {
  let component: UpdateModal;
  let fixture: ComponentFixture<UpdateModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
