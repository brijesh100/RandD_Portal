import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationTitleTileComponent } from './publication-title-tile.component';

describe('PublicationTitleTileComponent', () => {
  let component: PublicationTitleTileComponent;
  let fixture: ComponentFixture<PublicationTitleTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationTitleTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationTitleTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
