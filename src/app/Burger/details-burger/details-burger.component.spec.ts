import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBurgerComponent } from './details-burger.component';

describe('DetailsBurgerComponent', () => {
  let component: DetailsBurgerComponent;
  let fixture: ComponentFixture<DetailsBurgerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsBurgerComponent]
    });
    fixture = TestBed.createComponent(DetailsBurgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
