import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateTaskComponent } from './modal-create-task.component';

describe('ModalCreateTaskComponent', () => {
  let component: ModalCreateTaskComponent;
  let fixture: ComponentFixture<ModalCreateTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCreateTaskComponent]
    });
    fixture = TestBed.createComponent(ModalCreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
