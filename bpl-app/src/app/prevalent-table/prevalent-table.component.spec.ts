import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevalentTableComponent } from './prevalent-table.component';

describe('PrevalentTableComponent', () => {
  let component: PrevalentTableComponent;
  let fixture: ComponentFixture<PrevalentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevalentTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevalentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
