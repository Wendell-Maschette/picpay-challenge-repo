import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SnackbarService', () => {
  let snackbarService: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule],
      providers: [SnackbarService]
    });
    snackbarService = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(snackbarService).toBeTruthy();
  });

  it('should open a success snackbar', () => {
    const openSpy = spyOn(snackbarService['snackBar'], 'open');
    const message = 'Success message';

    snackbarService.showSnackbar(message, 'success');

    expect(openSpy).toHaveBeenCalledWith(message, 'X', {
      duration: 5000,
      panelClass: 'success-snackbar',
    });
  });

  it('should open an error snackbar', () => {
    const openSpy = spyOn(snackbarService['snackBar'], 'open');
    const message = 'Error message';

    snackbarService.showSnackbar(message, 'error');

    expect(openSpy).toHaveBeenCalledWith(message, 'X', {
      duration: 5000,
      panelClass: 'error-snackbar',
    });
  });
});
