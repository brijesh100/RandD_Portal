import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationAuthorResolveModalComponent } from './publication-author-resolve-modal.component';

describe('PublicationAuthorResolveModalComponent', () => {
  let component: PublicationAuthorResolveModalComponent;
  let fixture: ComponentFixture<PublicationAuthorResolveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationAuthorResolveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationAuthorResolveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
