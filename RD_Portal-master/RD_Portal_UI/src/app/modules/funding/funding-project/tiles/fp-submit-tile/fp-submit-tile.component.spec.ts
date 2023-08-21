import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpSubmitTileComponent } from './fp-submit-tile.component';

describe('FpSubmitTileComponent', () => {
  let component: FpSubmitTileComponent;
  let fixture: ComponentFixture<FpSubmitTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpSubmitTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpSubmitTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
