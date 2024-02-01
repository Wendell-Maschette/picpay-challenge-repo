import { ParamsForGetAllTasks } from './models/params-for-get-all-tasks.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TaskService } from 'src/app/modules/dashboard/services/tasks/task.service';
import { of, throwError } from 'rxjs';
import {
  MessageCode,
  SnackbarService,
} from 'src/app/shared/services/snack-bar/snackbar.service';
import { AuthService } from 'src/app/modules/login/services/auth/auth.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let taskService: TaskService;
  let snackbarService: SnackbarService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientModule, NoopAnimationsModule],
      providers: [TaskService, SnackbarService],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    taskService = TestBed.inject(TaskService);
    snackbarService = TestBed.inject(SnackbarService);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
