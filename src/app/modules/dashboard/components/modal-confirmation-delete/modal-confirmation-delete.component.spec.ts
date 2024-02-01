import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmationDeleteComponent } from './modal-confirmation-delete.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snack-bar/snackbar.service';
import { TaskService } from 'src/app/modules/dashboard/services/tasks/task.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

describe('ModalConfirmationDeleteComponent', () => {
  let component: ModalConfirmationDeleteComponent;
  let fixture: ComponentFixture<ModalConfirmationDeleteComponent>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<ModalConfirmationDeleteComponent>>;

  beforeEach(() => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [ModalConfirmationDeleteComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },

      ],
      imports: [ HttpClientModule, NoopAnimationsModule]
    });
    fixture = TestBed.createComponent(ModalConfirmationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
