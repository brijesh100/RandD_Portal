import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTileComponent } from './date-tile.component';

describe('DateTileComponent', () => {
  let component: DateTileComponent;
  let fixture: ComponentFixture<DateTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
