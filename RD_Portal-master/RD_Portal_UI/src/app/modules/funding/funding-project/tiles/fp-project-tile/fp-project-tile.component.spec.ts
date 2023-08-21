import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpProjectTileComponent } from './fp-project-tile.component';

describe('FpProjectTileComponent', () => {
  let component: FpProjectTileComponent;
  let fixture: ComponentFixture<FpProjectTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpProjectTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpProjectTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
