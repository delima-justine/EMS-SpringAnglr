import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTermModal } from './update-term-modal';

describe('UpdateTermModal', () => {
  let component: UpdateTermModal;
  let fixture: ComponentFixture<UpdateTermModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTermModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTermModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
