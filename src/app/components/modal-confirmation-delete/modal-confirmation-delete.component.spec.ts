import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmationDeleteComponent } from './modal-confirmation-delete.component';

describe('ModalConfirmationDeleteComponent', () => {
  let component: ModalConfirmationDeleteComponent;
  let fixture: ComponentFixture<ModalConfirmationDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfirmationDeleteComponent]
    });
    fixture = TestBed.createComponent(ModalConfirmationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
