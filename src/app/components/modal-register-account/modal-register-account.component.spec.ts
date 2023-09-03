import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegisterAccountComponent } from './modal-register-account.component';

describe('ModalRegisterAccountComponent', () => {
  let component: ModalRegisterAccountComponent;
  let fixture: ComponentFixture<ModalRegisterAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalRegisterAccountComponent]
    });
    fixture = TestBed.createComponent(ModalRegisterAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
