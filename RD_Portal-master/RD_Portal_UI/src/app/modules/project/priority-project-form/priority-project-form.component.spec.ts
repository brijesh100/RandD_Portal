import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityProjectFormComponent } from './priority-project-form.component';

describe('PriorityProjectFormComponent', () => {
  let component: PriorityProjectFormComponent;
  let fixture: ComponentFixture<PriorityProjectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityProjectFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
