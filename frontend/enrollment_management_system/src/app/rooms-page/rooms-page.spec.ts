import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsPage } from './rooms-page';

describe('RoomsPage', () => {
  let component: RoomsPage;
  let fixture: ComponentFixture<RoomsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
