import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderlogoutComponent } from './headerlogout.component';

describe('HeaderlogoutComponent', () => {
  let component: HeaderlogoutComponent;
  let fixture: ComponentFixture<HeaderlogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderlogoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderlogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
