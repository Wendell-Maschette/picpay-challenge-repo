import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalInsertTaskComponent } from './modal-insert-task.component';


describe('ModalInsertTaskComponent', () => {
  let component: ModalInsertTaskComponent;
  let fixture: ComponentFixture<ModalInsertTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalInsertTaskComponent]
    });
    fixture = TestBed.createComponent(ModalInsertTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
