import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareProjectComponent } from './share-project.component';

describe('ShareProjectComponent', () => {
  let component: ShareProjectComponent;
  let fixture: ComponentFixture<ShareProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
