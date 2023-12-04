import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstComponentTwoComponent } from './first-component-two.component';

describe('FirstComponentTwoComponent', () => {
  let component: FirstComponentTwoComponent;
  let fixture: ComponentFixture<FirstComponentTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstComponentTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirstComponentTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
