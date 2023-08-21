import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpCheckTileComponent } from './fp-check-tile.component';

describe('FpCheckTileComponent', () => {
  let component: FpCheckTileComponent;
  let fixture: ComponentFixture<FpCheckTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpCheckTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpCheckTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
