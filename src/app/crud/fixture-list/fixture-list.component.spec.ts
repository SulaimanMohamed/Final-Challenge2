import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureListComponent } from './fixture-list.component';

describe('FixtureListComponent', () => {
  let component: FixtureListComponent;
  let fixture: ComponentFixture<FixtureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixtureListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
