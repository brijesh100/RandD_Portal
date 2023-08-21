import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpDatesTileComponent } from './fp-dates-tile.component';

describe('FpDatesTileComponent', () => {
  let component: FpDatesTileComponent;
  let fixture: ComponentFixture<FpDatesTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpDatesTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpDatesTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
