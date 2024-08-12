import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedBurgerComponent } from './archived-burger.component';

describe('ArchivedBurgerComponent', () => {
  let component: ArchivedBurgerComponent;
  let fixture: ComponentFixture<ArchivedBurgerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivedBurgerComponent]
    });
    fixture = TestBed.createComponent(ArchivedBurgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
