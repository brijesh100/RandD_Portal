import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpKeywordsTileComponent } from './fp-keywords-tile.component';

describe('FpKeywordsTileComponent', () => {
  let component: FpKeywordsTileComponent;
  let fixture: ComponentFixture<FpKeywordsTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpKeywordsTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpKeywordsTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
