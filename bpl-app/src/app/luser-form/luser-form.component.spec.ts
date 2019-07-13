import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuserFormComponent } from './luser-form.component';

describe('LuserFormComponent', () => {
  let component: LuserFormComponent;
  let fixture: ComponentFixture<LuserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
