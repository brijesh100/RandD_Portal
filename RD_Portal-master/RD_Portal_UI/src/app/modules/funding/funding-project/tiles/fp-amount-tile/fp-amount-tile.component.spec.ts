import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpAmountTileComponent } from './fp-amount-tile.component';

describe('FpAmountTileComponent', () => {
  let component: FpAmountTileComponent;
  let fixture: ComponentFixture<FpAmountTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpAmountTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpAmountTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
