import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBurgerComponent } from './form-burger.component';

describe('FormBurgerComponent', () => {
  let component: FormBurgerComponent;
  let fixture: ComponentFixture<FormBurgerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormBurgerComponent]
    });
    fixture = TestBed.createComponent(FormBurgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
