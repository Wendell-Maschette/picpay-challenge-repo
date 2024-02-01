import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.interface';
import { ParamsForGetAllTasks } from '../../models/params-for-get-all-tasks.interface';
import { TaskListResponse } from '../../models/get-task-list.interface';



@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3030';

  constructor(private http: HttpClient) { }

  getTasks(reqParams?: ParamsForGetAllTasks): Observable<TaskListResponse> {
    const queryParams: string[] = [];
    console.log(reqParams)

    if (reqParams?.filters?.name) {
      queryParams.push(`name_like=^${reqParams.filters.name}`);
    }

    if (reqParams?.filters?.title) {
      queryParams.push(`title_like=^${reqParams.filters.title}`);
    }

    if (reqParams?.filters?.date) {
      queryParams.push(`date_like=^${reqParams.filters.date}`);
    }

    
    const reqTotalItems = this.http.get<Task[]>(`${this.baseUrl}/tasks${queryParams.length > 0 ? `?${queryParams.join('&')}` : ''}`).pipe(
      map(data => data.length)
    );
  
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    const defaultParams = [`_limit=10`, `_page=1`, '_sort=ASC'];
    const defaultQueryString = `?${defaultParams.join('&')}`;
    const url = `${this.baseUrl}/tasks${queryString}${queryString ? '&' : ''}${defaultQueryString}`;
  
    return reqTotalItems.pipe(
      switchMap(totalItems => {
        return this.http.get<Task[]>(url).pipe(
          map(data => ({ data, totalItems }))
        );
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
