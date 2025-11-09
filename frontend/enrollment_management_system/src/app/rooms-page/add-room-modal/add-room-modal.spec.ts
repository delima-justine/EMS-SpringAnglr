import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomModal } from './add-room-modal';

describe('AddRoomModal', () => {
  let component: AddRoomModal;
  let fixture: ComponentFixture<AddRoomModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRoomModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoomModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
