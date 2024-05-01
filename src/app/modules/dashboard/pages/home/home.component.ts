import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/modules/dashboard/models/task.interface';
import { TaskService } from 'src/app/modules/dashboard/services/tasks/task.service';
import { ParamsForGetAllTasks } from 'src/app/modules/dashboard/models/params-for-get-all-tasks.interface';
import { MatDialog } from '@angular/material/dialog';

import {
  MessageCode,
  SnackbarService,
} from 'src/app/shared/services/snack-bar/snackbar.service';
import { TaskListResponse } from 'src/app/modules/dashboard/models/get-task-list.interface';
import { AuthService } from 'src/app/modules/login/services/auth/auth.service';
import { ModalConfirmationDeleteComponent, ModalInsertTaskComponent } from '../../components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dataSource!: MatTableDataSource<Task>;
  displayedColumns: string[] = [
    'name',
    'title',
    'value',
    'date',
    'isPayed',
    'actions',
    'actions-mobile',
  ];
  getTasks$: Subscription = new Subscription();
  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;

  filterForm: FormGroup;

  constructor() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;

    this.filterForm = this.fb.group({
      name: [''],
      title: [''],
      date: [''],
    });
  }

  taskService = inject(TaskService);
  fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  snackbarService = inject(SnackbarService);
  authService = inject(AuthService);

  ngOnInit() {
    this.search();
  }

  search(paginationParam?: any) {
    console.log(paginationParam)
    const queryParams: ParamsForGetAllTasks = {
      filters: { ...this.filterForm.value },
      actualPage: paginationParam?.actualPage ? paginationParam.actualPage : 1,
    };

    console.log(queryParams)


    this.getTasks$ = this.taskService.getTasks(queryParams).subscribe({
      next: (tasksDataResponse: TaskListResponse) => {
        this.totalItems = tasksDataResponse.totalItems;
        this.dataSource.data = tasksDataResponse.data;
      },
      error: (err: any) => {
        this.snackbarService.showSnackbar(MessageCode.TaskGetError, 'error');
      },
      complete: () => {
        this.getTasks$.unsubscribe;
      },
    });
  }

  insertTask(itemToEdit: Task | null = null) {
    const dialogRef = this.dialog.open(ModalInsertTaskComponent, {
      disableClose: true,
      width: '400px',
      data: itemToEdit,
    });

    dialogRef.afterClosed().subscribe((result) => {
      result ? window.location.reload() : '';
    });
  }

  confirmationDelete(taskId: number) {
    const dialogRef = this.dialog.open(ModalConfirmationDeleteComponent, {
      disableClose: true,
      width: '400px',
      data: taskId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      result ? window.location.reload() : '';
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    const params: ParamsForGetAllTasks = {
      actualPage: this.currentPage,
      limit: this.itemsPerPage,
    };
    this.search(params);
  }
}
