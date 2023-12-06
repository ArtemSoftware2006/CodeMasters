import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLigthComponent } from './button-ligth.component';

describe('ButtonLigthComponent', () => {
  let component: ButtonLigthComponent;
  let fixture: ComponentFixture<ButtonLigthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonLigthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonLigthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
