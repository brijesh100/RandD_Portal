import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentEditComponent } from './patent-edit.component';

describe('PatentEditComponent', () => {
  let component: PatentEditComponent;
  let fixture: ComponentFixture<PatentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
