import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyDetailsTileComponent } from './consultancy-details-tile.component';

describe('ConsultancyDetailsTileComponent', () => {
  let component: ConsultancyDetailsTileComponent;
  let fixture: ComponentFixture<ConsultancyDetailsTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultancyDetailsTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultancyDetailsTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
