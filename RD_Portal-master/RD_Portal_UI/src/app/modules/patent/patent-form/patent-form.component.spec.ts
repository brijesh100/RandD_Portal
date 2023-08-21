import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentFormComponent } from './patent-form.component';

describe('PatentFormComponent', () => {
  let component: PatentFormComponent;
  let fixture: ComponentFixture<PatentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
