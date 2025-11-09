import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoomModal } from './update-room-modal';

describe('UpdateRoomModal', () => {
  let component: UpdateRoomModal;
  let fixture: ComponentFixture<UpdateRoomModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRoomModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRoomModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
