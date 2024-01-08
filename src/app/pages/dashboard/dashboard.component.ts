import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { ParamsForGetAllTasks } from 'src/app/models/params-for-get-all-tasks.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalInsertTaskComponent } from '../../components/modal-insert-task/modal-insert-task.component';
import { ModalConfirmationDeleteComponent } from '../../components/modal-confirmation-delete/modal-confirmation-delete.component';
import { MessageCode, SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataSource!: MatTableDataSource<Task>;
  displayedColumns: string[] = ['name', 'title', 'value', 'date', 'isPayed', 'actions', 'actions-mobile'];
  actualPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  pageNumbers: number[] = [];
  sortField?: 'name' | 'title' | 'value' | 'date' | 'isPayed';
  sortOrder?: 'asc' | 'desc';

  getTasks$: Subscription = new Subscription;


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

  search() {
    this.getTasks$ = this.taskService.getTasks(this.filterForm.value).subscribe({
      next: (tasksDataResponse: Task[]) => {
        this.dataSource.data = tasksDataResponse;
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
}
