import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.interface';
import { ParamsForGetAllTasks } from '../../models/params-for-get-all-tasks.interface';
import { TaskListResponse } from '../../models/get-task-list.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:3030';

  constructor(private http: HttpClient) {}

  getTasks(reqParams?: ParamsForGetAllTasks): Observable<TaskListResponse> {
    const queryParams: string[] = [];

    if (reqParams?.filters) {
      const { name, title, date } = reqParams.filters;
      if (name) {
        queryParams.push(`name_like=^${name}`);
      }

      if (title) {
        queryParams.push(`title_like=^${title}`);
      }

      if (date) {
        queryParams.push(`date_like=^${date}`);
      }
    }

    const reqTotalItems = this.http
      .get<Task[]>(
        `${this.baseUrl}/tasks${
          queryParams.length > 0 ? `?${queryParams.join('&')}` : ''
        }`
      )
      .pipe(map((data) => data.length));

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    const defaultParams = [
      `_limit=10`,
      `_page=${reqParams?.actualPage}`,
      '_sort=ASC',
    ];
    const defaultQueryString = `?${defaultParams.join('&')}`;
    const url = `${this.baseUrl}/tasks${queryString}${
      queryString ? '&' : ''
    }${defaultQueryString}`;

    return reqTotalItems.pipe(
      switchMap((totalItems) => {
        return this.http
          .get<Task[]>(url)
          .pipe(map((data) => ({ data, totalItems })));
      })
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, task);
  }

  updateTask(taskEdited: Task, id?: number): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/tasks/${id}`, taskEdited);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${taskId}`);
  }
}
