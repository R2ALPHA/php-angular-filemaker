import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlayerComponent } from './all-player.component';

describe('AllPlayerComponent', () => {
  let component: AllPlayerComponent;
  let fixture: ComponentFixture<AllPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
