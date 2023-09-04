import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.interface';
import { ErrorCode, SnackbarService } from 'src/app/services/snackbar.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-modal-insert-task',
  templateUrl: './modal-insert-task.component.html',
  styleUrls: ['./modal-insert-task.component.scss']
})
export class ModalInsertTaskComponent {
  createTaskForm: FormGroup;
  isEditMode: boolean = false; 

  constructor(
    private dialogRef: MatDialogRef<ModalInsertTaskComponent>,
    private taskService: TaskService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Task 
  ) {
    this.createTaskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      username: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      date: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(0.01)]],
      isPayed: [false],
    });

    if (data) {
      this.isEditMode = true;
      this.createTaskForm.patchValue(data);
    }
  }
  get name() {
    return this.createTaskForm.get('name');
  }

  get title() {
    return this.createTaskForm.get('title');
  }

  get date() {
    return this.createTaskForm.get('date');
  }

  get value() {
    return this.createTaskForm.get('value');
  }

  get isPayed() {
    return this.createTaskForm.get('isPayed');
  }

  saveData() {
    if (this.createTaskForm.invalid) {
      console.log('Erro no formulário');
      return;
    }
  
    const formData: Task = this.createTaskForm.value;
    const taskObservable = this.isEditMode
      ? this.taskService.updateTask(formData, this.data.id)
      : this.taskService.createTask(formData);
  
    taskObservable.subscribe({
      next: (res: Task) => {
        const successMessage = this.isEditMode
          ? ErrorCode.TaskUpdateSuccess
          : ErrorCode.TaskCreateSuccess
  
        this.snackbarService.showSnackbar(successMessage, 'success');
        this.dialogRef.close({ completed: true });
      },
      error: (err: any) => {
        const errorMessage = this.isEditMode
          ? ErrorCode.TaskUpdateError
          : ErrorCode.TaskCreateError;
  
        this.snackbarService.showSnackbar(errorMessage, 'error');
        this.dialogRef.close({ completed: false });
      },
    });
  }  

  closeModal() {
    this.dialogRef.close();
  }
}
