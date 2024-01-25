import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/tasks/task.service';
import { ParamsForGetAllTasks } from 'src/app/models/params-for-get-all-tasks.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalInsertTaskComponent } from '../../components/modal-insert-task/modal-insert-task.component';
import { ModalConfirmationDeleteComponent } from '../../components/modal-confirmation-delete/modal-confirmation-delete.component';
import { MessageCode, SnackbarService } from 'src/app/services/snack-bar/snackbar.service';
import { TaskListResponse } from 'src/app/models/get-task-list.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataSource!: MatTableDataSource<Task>;
  displayedColumns: string[] = ['name', 'title', 'value', 'date', 'isPayed', 'actions', 'actions-mobile'];
  getTasks$: Subscription = new Subscription;
  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;

  filterForm: FormGroup;

  constructor(
  ) {
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
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.search()
  }

  search(paginationParam?: any) {
    let queryParams = {
      ...this.filterForm.value
    }
    if (paginationParam) {
      queryParams = {
        ...this.filterForm.value,
        ...this.filterForm.value,
      }
    }

    this.getTasks$ = this.taskService.getTasks(queryParams).subscribe({
      next: (tasksDataResponse: TaskListResponse) => {
        this.totalItems = tasksDataResponse.totalItems;
        this.dataSource.data = tasksDataResponse.data;
      },
      error: (err: any) => {
        this.snackbarService.showSnackbar(MessageCode.TaskGetError, 'error');
      },
      complete: () => {
        console.log(this.filterForm.value)
        this.getTasks$.unsubscribe;
      }
    })
  }

  logout() {
    this.authService.logout();
  }

  insertTask(itemToEdit: Task | null = null) {
    const dialogRef = this.dialog.open(ModalInsertTaskComponent, {
      disableClose: true,
      width: '400px',
      data: itemToEdit,
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? window.location.reload() : '';
    });
  }

  confirmationDelete(taskId: number) {
    const dialogRef = this.dialog.open(ModalConfirmationDeleteComponent, {
      disableClose: true,
      width: '400px',
      data: taskId,
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? window.location.reload() : '';
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    const params: ParamsForGetAllTasks = {
      actualPage: this.currentPage,
      limit: this.itemsPerPage
    };

    this.search(params)
  }
}
