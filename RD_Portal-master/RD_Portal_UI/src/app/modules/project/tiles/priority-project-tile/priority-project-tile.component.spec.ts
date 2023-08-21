import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityProjectTileComponent } from './priority-project-tile.component';

describe('PriorityProjectTileComponent', () => {
  let component: PriorityProjectTileComponent;
  let fixture: ComponentFixture<PriorityProjectTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityProjectTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityProjectTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
