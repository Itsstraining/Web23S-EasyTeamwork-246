import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallprojectComponent } from './viewallproject.component';

describe('ViewallprojectComponent', () => {
  let component: ViewallprojectComponent;
  let fixture: ComponentFixture<ViewallprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewallprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewallprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
