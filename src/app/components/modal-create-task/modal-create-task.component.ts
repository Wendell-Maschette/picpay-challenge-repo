import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-modal-create-task',
  templateUrl: './modal-create-task.component.html',
  styleUrls: ['./modal-create-task.component.css']
})
export class ModalCreateTaskComponent {
  createTaskForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<ModalCreateTaskComponent>, private taskService: TaskService, private fb: FormBuilder,) {
    this.createTaskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      username: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      title: ['', Validators.required],
      date: ['', Validators.required],
      value: [0.00, Validators.required],
      isPayed: [false],
    });
  }

  saveData() {
    const formData: Task = this.createTaskForm.value;
    if (!this.createTaskForm.invalid) {
      this.taskService.createTask(formData).subscribe(
        (res) => {
          console.log('task criada com sucesso')
        }
      )
      return this.dialogRef.close()
    }
    console.log('Erro no formulário')
  }

  closeModal() {
    this.dialogRef.close();
  }
}
