import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentPageComponent } from './patent-page.component';

describe('PatentPageComponent', () => {
  let component: PatentPageComponent;
  let fixture: ComponentFixture<PatentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
