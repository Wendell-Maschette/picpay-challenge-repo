import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { ParamsForGetAllTasks } from 'src/app/models/params-for-get-all-tasks.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalInsertTaskComponent } from '../modal-insert-task/modal-insert-task.component';
import { ModalConfirmationDeleteComponent } from '../modal-confirmation-delete/modal-confirmation-delete.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  dataSource!: MatTableDataSource<Task>;
  displayedColumns: string[] = ['name', 'title', 'value', 'date', 'isPayed', 'actions'];
  actualPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  pageNumbers: number[] = [];
  sortField?: 'name' | 'title' | 'value' | 'date' | 'isPayed';
  sortOrder?: 'asc' | 'desc';

  private reqParams: ParamsForGetAllTasks = {
    filters: '',
    actualPage: this.actualPage
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;

  filterForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.filterForm = this.fb.group({
      name: [''],
      title: [''],
      date: [''],
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.getTotalItemsDetails()
  }

  ngAfterViewInit(): void {
    this.filterTasks();
  }

  getTasks(reqParams: ParamsForGetAllTasks) {
    this.taskService.getAllTasks(reqParams).subscribe(
      (tasksDataResponse) => {
        this.dataSource.data = tasksDataResponse;
      }
    );
  }

  getTotalItemsDetails() {
    this.taskService.getAllTasks({
      filters: '',
      order: ''
    }).subscribe(
      (totalItemsResponse) => {
        this.totalItems = totalItemsResponse.length
        this.totalPages = Math.ceil(this.totalItems / 10);
        this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      }
    )
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  filterTasks() {
    const filterParams = this.reqParams;
    filterParams.filters = this.filterForm.value
    this.getTasks(filterParams)
  }

  updateAndApplyFilter(fieldName: string) {
    const filters = this.filterForm.value;

    if (filters[fieldName]) {
      filters[fieldName] = filters[fieldName].charAt(0).toUpperCase() + filters[fieldName].slice(1);
    }

    Object.keys(filters).forEach(key => {
      if (key !== fieldName) {
        this.filterForm.get(key)?.setValue('');
      }
    });

    this.filterTasks();
  }

  sortBy() {
    const sortedParams: ParamsForGetAllTasks = this.reqParams;
    sortedParams.sort = this.sort.active;
    sortedParams.order = this.sortOrder;
    this.actualPage = 1
    sortedParams.actualPage = this.actualPage;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.getTasks(sortedParams)
  }

  onPageChange(newPage: number) {
    const lastPageWithRecords = this.actualPage - 1
    const pageChangeParams: ParamsForGetAllTasks = this.reqParams;
    pageChangeParams.actualPage = newPage
    pageChangeParams.limit = this.pageSize

    this.actualPage = newPage;
    this.getTasks(pageChangeParams);
    if (this.dataSource.data.length === 0) {
      pageChangeParams.actualPage = lastPageWithRecords
      this.getTasks(pageChangeParams);
    }
  }

  openModal(itemToEdit: Task | null = null) {
    const dialogRef = this.dialog.open(ModalInsertTaskComponent, {
      width: '400px',
      data: itemToEdit,
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? window.location.reload() :
        console.log(`O modal foi fechado e retornou: ${result}`);
    });
  }

  openModalConfirmationDelete(taskId: number) {
    const dialogRef = this.dialog.open(ModalConfirmationDeleteComponent, {
      width: '400px',
      data: taskId,
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? window.location.reload() :
        console.log(`O modal foi fechado e retornou: ${result}`);
    });
  }
}
