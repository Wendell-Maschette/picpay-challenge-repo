import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalInsertTaskComponent } from './modal-insert-task.component';
import { ComponentsModule } from '../../../../components/components.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/modules/login/services/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snack-bar/snackbar.service';
import { FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('ModalInsertTaskComponent', () => {
  let component: ModalInsertTaskComponent;
  let fixture: ComponentFixture<ModalInsertTaskComponent>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<ModalInsertTaskComponent>>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let snackbarServiceMock: jasmine.SpyObj<SnackbarService>;
  beforeEach(() => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    authServiceMock = jasmine.createSpyObj('AuthService', ['registerAccount']);
    snackbarServiceMock = jasmine.createSpyObj('SnackbarService', ['showSnackbar']);

    TestBed.configureTestingModule({
      declarations: [ModalInsertTaskComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: SnackbarService, useValue: snackbarServiceMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [ComponentsModule, HttpClientModule, NoopAnimationsModule]
    });
    fixture = TestBed.createComponent(ModalInsertTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
