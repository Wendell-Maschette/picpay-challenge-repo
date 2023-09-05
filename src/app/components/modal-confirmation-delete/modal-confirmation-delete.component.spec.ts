import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmationDeleteComponent } from './modal-confirmation-delete.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TaskService } from 'src/app/services/task.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../components.module';

describe('ModalConfirmationDeleteComponent', () => {
  let component: ModalConfirmationDeleteComponent;
  let fixture: ComponentFixture<ModalConfirmationDeleteComponent>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<ModalConfirmationDeleteComponent>>;
  let snackbarServiceMock: jasmine.SpyObj<SnackbarService>;
  let taskServiceMock: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [ModalConfirmationDeleteComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },

      ],
      imports: [ComponentsModule, HttpClientModule, NoopAnimationsModule]
    });
    fixture = TestBed.createComponent(ModalConfirmationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
