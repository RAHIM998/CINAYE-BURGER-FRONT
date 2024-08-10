import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUsersComponent } from './details-users.component';

describe('DetailsUsersComponent', () => {
  let component: DetailsUsersComponent;
  let fixture: ComponentFixture<DetailsUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsUsersComponent]
    });
    fixture = TestBed.createComponent(DetailsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
