import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentDetailsTileComponent } from './patent-details-tile.component';

describe('PatentDetailsTileComponent', () => {
  let component: PatentDetailsTileComponent;
  let fixture: ComponentFixture<PatentDetailsTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentDetailsTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentDetailsTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
