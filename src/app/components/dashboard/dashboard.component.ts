import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Task } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { map } from 'rxjs';
import { ParamsForGetAllTasks } from 'src/app/models/params-for-get-all-tasks.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataSource!: MatTableDataSource<Task>;
  displayedColumns: string[] = ['name', 'title', 'value', 'date', 'isPayed'];
  actualPage: string | null = '1'
  sortField: string | undefined | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;

  filterForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder
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
    this.dataSource.paginator = this.paginator;

    this.filterTasks();
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  filterTasks() {
    const reqParams: ParamsForGetAllTasks = {
      filters: this.filterForm.value,
      actualPage: this.actualPage
    }

    this.taskService.getAllTasks(reqParams).subscribe(
      (filteredTasks) => {
        this.dataSource.data = filteredTasks;
      }
    );
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

  sortByField() {
    console.log(this.sort)
    const reqParams: ParamsForGetAllTasks = {
      filters: '',
      actualPage: this.actualPage,
      sort: this.sort.active,
      order: this.sortOrder
    }
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.taskService.getAllTasks(reqParams).subscribe(
      (sortedTasks) => {
        this.dataSource.data = sortedTasks;
      }
    );
  }

}
