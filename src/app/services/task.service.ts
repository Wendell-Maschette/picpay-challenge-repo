import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.interface';
import { ParamsForGetAllTasks } from '../models/params-for-get-all-tasks.interface';



@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3030';

  constructor(private http: HttpClient) { }

  getAllTasks(reqParams: ParamsForGetAllTasks): Observable<Task[]> {
    let queryParams = new HttpParams();

    typeof reqParams.actualPage === 'number' ? queryParams = queryParams.set('_page', reqParams.actualPage) : '';
    typeof reqParams.limit === 'number' ? queryParams = queryParams.set('_limit', reqParams.limit) : '';

    const activeFilter = reqParams.filters.name || reqParams.filters.date || reqParams.filters.title;
    if (activeFilter) {
      const activeFilterKey = Object.keys(reqParams.filters).find(key => reqParams.filters[key] === activeFilter);
      activeFilterKey ? queryParams = queryParams.set(activeFilterKey, activeFilter.trim()) : ''
    }
    
    reqParams.sort ? queryParams = queryParams.set('_sort', reqParams.sort) : undefined;
    reqParams.order ? queryParams = queryParams.set('_order', reqParams.order) : undefined;

    let url = `${this.baseUrl}/tasks`;
    
    return this.http.get<Task[]>(url, { params: queryParams });
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
