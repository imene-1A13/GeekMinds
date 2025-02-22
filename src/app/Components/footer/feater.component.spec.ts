import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaterComponent } from './feater.component';

describe('FeaterComponent', () => {
  let component: FeaterComponent;
  let fixture: ComponentFixture<FeaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
