import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.interface';
import { Filters, ParamsForGetAllTasks } from '../models/params-for-get-all-tasks.interface';



@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3030';

  constructor(private http: HttpClient) { }

  getTasks(reqParams?: Filters): Observable<Task[]> {
    const queryParams: string[] = [];
  
    if (reqParams?.name) {
      queryParams.push(`name_like=^${reqParams.name}`);
    }
  
    if (reqParams?.title) {
      queryParams.push(`title_like=^${reqParams.title}`);
    }
  
    if (reqParams?.date) {
      queryParams.push(`date_like=^${reqParams.date}`);
    }
  
    const defaultParams = ['_limit=10', '_page=0', '_sort=ASC'];  
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    const defaultQueryString = `?${defaultParams.join('&')}`;
  
    const url = `${this.baseUrl}/tasks${queryString}${queryString ? '&' : ''}${defaultQueryString}`;
  
    return this.http.get<Task[]>(url);
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
