import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchLabFormComponent } from './research-lab-form.component';

describe('ResearchLabFormComponent', () => {
  let component: ResearchLabFormComponent;
  let fixture: ComponentFixture<ResearchLabFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchLabFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchLabFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
