import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { ParamsForGetAllTasks } from '../../models/params-for-get-all-tasks.interface';
import { Task } from '../../models/task.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { throwError } from 'rxjs'; 

describe('TaskService', () => {
  let taskService: TaskService;
  let httpTestingController: HttpTestingController;

  const mockedTasks: Task[] = [
    {
      id: 1,
      name: 'User 1',
      title: 'Task 1',
      value: 100,
      date: '2023-09-04',
      isPayed: false,
    },
    {
      id: 2,
      name: 'User 2',
      title: 'Task 2',
      value: 200,
      date: '2023-09-05',
      isPayed: true,
    },
    {
      id: 3,
      name: 'User 3',
      title: 'Task 3',
      value: 150,
      date: '2023-09-06',
      isPayed: false,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });
    taskService = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  it('should retrieve tasks without query params', () => {
    const reqParams: ParamsForGetAllTasks = {
      filters: '',
    };

    taskService.getAllTasks(reqParams).subscribe((tasks) => {
      expect(tasks).toEqual(mockedTasks);
    });

    const req = httpTestingController.expectOne('http://localhost:3030/tasks');
    expect(req.request.method).toEqual('GET');

    req.flush(mockedTasks);
  });

  it('should retrieve tasks with different pagination', () => {
    const reqParams: ParamsForGetAllTasks = {
      filters: '',
      actualPage: 2,
      limit: 5,
    };

    const expectedTasks: Task[] = mockedTasks.slice(5, 10);

    taskService.getAllTasks(reqParams).subscribe((tasks) => {
      expect(tasks).toEqual(expectedTasks);
    });

    const req = httpTestingController.expectOne('http://localhost:3030/tasks?_page=2&_limit=5');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedTasks);
  });

  it('should retrieve tasks with different pagination and item limits', () => {
    const reqParams: ParamsForGetAllTasks = {
      filters: '',
      actualPage: 3,
      limit: 8,
    };

    const expectedTasks: Task[] = mockedTasks.slice(16, 24);

    taskService.getAllTasks(reqParams).subscribe((tasks) => {
      expect(tasks).toEqual(expectedTasks);
    });

    const req = httpTestingController.expectOne('http://localhost:3030/tasks?_page=3&_limit=8');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedTasks);
  });

  it('should retrieve tasks with name filters', () => {
    const reqParams: ParamsForGetAllTasks = {
      filters: {
        name: 'User 1',
      },
    };

    const expectedTasks: Task[] = [mockedTasks[0]];

    taskService.getAllTasks(reqParams).subscribe((tasks) => {
      expect(tasks).toEqual(expectedTasks);
    });

    const req = httpTestingController.expectOne('http://localhost:3030/tasks?name=User%201');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedTasks);
  });

  it('should retrieve tasks with title filter', () => {
    const reqParams: ParamsForGetAllTasks = {
      filters: {
        title: 'Task 2',
      },
    };

    const expectedTasks: Task[] = [mockedTasks[1]];

    taskService.getAllTasks(reqParams).subscribe((tasks) => {
      expect(tasks).toEqual(expectedTasks);
    });

    const req = httpTestingController.expectOne('http://localhost:3030/tasks?title=Task%202');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedTasks);
  });

  it('should retrieve tasks with date filter', () => {
    const reqParams: ParamsForGetAllTasks = {
      filters: {
        date: '2023-09-06',
      },
    };

    const expectedTasks: Task[] = [mockedTasks[2]];

    taskService.getAllTasks(reqParams).subscribe((tasks) => {
      expect(tasks).toEqual(expectedTasks);
    });

    const req = httpTestingController.expectOne('http://localhost:3030/tasks?date=2023-09-06');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedTasks);
  });

  it('should retrieve tasks sorted by name in ascending order', () => {
    const reqParams: ParamsForGetAllTasks = {
      filters: '',
      sort: 'name', 
      order: 'asc', 
    };

    const expectedTasks: Task[] = [mockedTasks[0], mockedTasks[1], mockedTasks[2]]; 

    taskService.getAllTasks(reqParams).subscribe((tasks) => {
      expect(tasks).toEqual(expectedTasks);
    });

    const req = httpTestingController.expectOne('http://localhost:3030/tasks?_sort=name&_order=asc');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedTasks);
  });

  it('should retrieve tasks sorted by value in descending order', () => {
    const reqParams: ParamsForGetAllTasks = {
      filters: '',
      sort: 'value', 
      order: 'desc', 
    };

    const expectedTasks: Task[] = [mockedTasks[1], mockedTasks[2], mockedTasks[0]]; 

    taskService.getAllTasks(reqParams).subscribe((tasks) => {
      expect(tasks).toEqual(expectedTasks);
    });

    const req = httpTestingController.expectOne('http://localhost:3030/tasks?_sort=value&_order=desc');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedTasks);
  });

  it('should create a new task successfully', () => {
    const newTask: Task = {
      name: 'User 4',
      title: 'Task 4',
      value: 300,
      date: '2023-09-07',
      isPayed: false,
    };

    const expectedResponse = { ...newTask, id: 4 }; 

    taskService.createTask(newTask).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne('http://localhost:3030/tasks');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newTask);

    req.flush(expectedResponse);
  });

  it('should create a new task successfully', () => {
    const newTask: Task = {
      name: 'User 4',
      title: 'Task 4',
      value: 300,
      date: '2023-09-07',
      isPayed: false,
    };

    const expectedResponse = { ...newTask, id: 4 };

    taskService.createTask(newTask).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne('http://localhost:3030/tasks');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newTask);

    req.flush(expectedResponse);
  });

  it('should handle an unsuccessful task creation', () => {
    const newTask: Task = {
      name: 'User 4',
      title: 'Task 4',
      value: 300,
      date: '2023-09-07',
      isPayed: false,
    };

    taskService.createTask(newTask).subscribe(
      () => {
        fail('Expected createTask to handle error, but it succeeded');
      },
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne('http://localhost:3030/tasks');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newTask);

    req.error(new ErrorEvent('HTTP error'), { status: 500 });
  });

  it('should update a task successfully', () => {
    const updatedTask: Task = {
      id: 1,
      name: 'Updated User',
      title: 'Updated Task',
      value: 300,
      date: '2023-09-07',
      isPayed: true,
    };

    const taskId = 1;

    taskService.updateTask(updatedTask, taskId).subscribe((response) => {
      expect(response).toEqual(updatedTask);
    });

    const req = httpTestingController.expectOne(`http://localhost:3030/tasks/${taskId}`);
    expect(req.request.method).toEqual('PUT');

    req.flush(updatedTask);
  });

  it('should handle an unsuccessful task update', () => {
    const updatedTask: Task = {
      id: 1,
      name: 'Updated User',
      title: 'Updated Task',
      value: 300,
      date: '2023-09-07',
      isPayed: true,
    };

    const taskId = 1;

    taskService.updateTask(updatedTask, taskId).subscribe(
      () => {
        fail('Expected updateTask to handle error, but it succeeded');
      },
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(`http://localhost:3030/tasks/${taskId}`);
    expect(req.request.method).toEqual('PUT');

    req.error(new ErrorEvent('HTTP error'), { status: 500 });
  });

  it('should delete a task successfully', () => {
    const taskId = 1;

    taskService.deleteTask(taskId).subscribe(() => {
      expect().nothing();
    });

    const req = httpTestingController.expectOne(`http://localhost:3030/tasks/${taskId}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush(null, { status: 204, statusText: 'No Content' });
  });

  it('should handle an unsuccessful task deletion', () => {
    const taskId = 1;

    taskService.deleteTask(taskId).subscribe(
      () => {
        fail('Expected deleteTask to handle error, but it succeeded');
      },
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(`http://localhost:3030/tasks/${taskId}`);
    expect(req.request.method).toEqual('DELETE');

    req.error(new ErrorEvent('HTTP error'), { status: 500 });
  });

});
