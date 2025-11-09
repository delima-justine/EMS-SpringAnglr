import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProgModal } from './update-prog-modal';

describe('UpdateProgModal', () => {
  let component: UpdateProgModal;
  let fixture: ComponentFixture<UpdateProgModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProgModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProgModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
