import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataModalComponent } from './user-data-modal.component';

describe('UserDataModalComponent', () => {
  let component: UserDataModalComponent;
  let fixture: ComponentFixture<UserDataModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDataModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
