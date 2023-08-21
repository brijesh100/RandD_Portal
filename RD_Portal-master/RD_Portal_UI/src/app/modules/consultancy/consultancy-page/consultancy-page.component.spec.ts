import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyPageComponent } from './consultancy-page.component';

describe('ConsultancyPageComponent', () => {
  let component: ConsultancyPageComponent;
  let fixture: ComponentFixture<ConsultancyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultancyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultancyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
