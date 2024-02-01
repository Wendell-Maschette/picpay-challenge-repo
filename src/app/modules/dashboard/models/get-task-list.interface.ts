import { Task } from "./task.interface";

export interface TaskListResponse {
   data: Task[];
   totalItems: number;
}
