import { ParamsForGetAllTasks } from '../../models/params-for-get-all-tasks.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../../components/components.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TaskService } from 'src/app/services/tasks/task.service';
import { of, throwError } from 'rxjs';
import { MessageCode, SnackbarService } from 'src/app/services/snack-bar/snackbar.service';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let taskService: TaskService;
  let snackbarService: SnackbarService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [ComponentsModule, HttpClientModule, NoopAnimationsModule],
      providers: [TaskService, SnackbarService]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    taskService = TestBed.inject(TaskService);
    snackbarService = TestBed.inject(SnackbarService);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch tasks on initialization', () => {
    const mockTasks  = [{
      "name": "Pennie Dumphries",
      "username": "pdumphries0",
      "title": "Dental Hygienist",
      "date": "2020-07-21T05:53:20Z",
      "value": 19.95,
      "isPayed": true,
      "id": 1
    },];

    spyOn(taskService, 'getAllTasks').and.returnValue(of(mockTasks));

    component.ngOnInit();
    expect(component.totalItems).toBe(1);
    expect(component.totalPages).toBe(1);

    component.ngAfterViewInit();

    expect(taskService.getAllTasks).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockTasks);
  });

  it('should handle error when fetching tasks', () => {
    const reqParamsMock: ParamsForGetAllTasks = {filters: ''}
    spyOn(taskService, 'getAllTasks').and.returnValue(throwError(() => new Error('Internal Server Error')));
    spyOn(snackbarService, 'showSnackbar')

    component.getTasks(reqParamsMock);

    expect(component.snackbarService.showSnackbar).toHaveBeenCalledWith(
      MessageCode.TaskGetError,
      'error'
    );
  });

  it('should validate date field', () => {
    component.filterForm.controls['name'].setValue('Valid Name');
    component.filterForm.controls['title'].setValue('Valid Title');
    component.filterForm.controls['date'].setValue('Invalid Date'); 

    component.filterTasks();

    expect(component.filterForm.controls['date'].hasError('matDatepickerParse')).toBe(true);
  });

  it('should log out and navigate to home page', () => {
    spyOn(authService, 'logout');

    component.logout();

    expect(authService.logout).toHaveBeenCalled();
  });

});
