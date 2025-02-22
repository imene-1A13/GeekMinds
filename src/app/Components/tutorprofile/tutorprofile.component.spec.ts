import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorprofileComponent } from './tutorprofile.component';

describe('TutorprofileComponent', () => {
  let component: TutorprofileComponent;
  let fixture: ComponentFixture<TutorprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
