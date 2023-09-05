import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ModalRegisterAccountComponent } from './modal-register-account.component';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService, MessageCode } from 'src/app/services/snackbar.service';
import { ComponentsModule } from '../components.module';

describe('ModalRegisterAccountComponent', () => {
  let component: ModalRegisterAccountComponent;
  let fixture: ComponentFixture<ModalRegisterAccountComponent>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<ModalRegisterAccountComponent>>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let snackbarServiceMock: jasmine.SpyObj<SnackbarService>;

  beforeEach(() => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    authServiceMock = jasmine.createSpyObj('AuthService', ['registerAccount']);
    snackbarServiceMock = jasmine.createSpyObj('SnackbarService', ['showSnackbar']);

    TestBed.configureTestingModule({
      declarations: [ModalRegisterAccountComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: SnackbarService, useValue: snackbarServiceMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [ ComponentsModule]
    });

    fixture = TestBed.createComponent(ModalRegisterAccountComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 

  // Add more test cases as needed

});
