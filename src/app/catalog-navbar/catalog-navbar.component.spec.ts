import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogNavbarComponent } from './catalog-navbar.component';

describe('CatalogNavbarComponent', () => {
  let component: CatalogNavbarComponent;
  let fixture: ComponentFixture<CatalogNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogNavbarComponent]
    });
    fixture = TestBed.createComponent(CatalogNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
