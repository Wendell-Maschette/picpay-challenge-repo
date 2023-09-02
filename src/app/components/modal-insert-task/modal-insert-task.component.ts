import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-modal-insert-task',
  templateUrl: './modal-insert-task.component.html',
  styleUrls: ['./modal-insert-task.component.css']
})
export class ModalInsertTaskComponent {
  createTaskForm: FormGroup;
  isEditMode: boolean = false; // Variável para rastrear se está no modo de edição

  constructor(
    private dialogRef: MatDialogRef<ModalInsertTaskComponent>,
    private taskService: TaskService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Task // Recebe o item a ser editado como dado injetado
  ) {
    this.createTaskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      username: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      title: ['', Validators.required],
      date: ['', Validators.required],
      value: [0.00, Validators.required],
      isPayed: [false],
    });

    // Verifique se há dados passados para determinar se está no modo de edição
    if (data) {
      this.isEditMode = true;
      // Preencha o formulário com os dados do item passado
      this.createTaskForm.patchValue(data);
    }
  }

  saveData() {
    let completed = false;
    const formData: Task = this.createTaskForm.value;
    if (!this.createTaskForm.invalid) {
      if (this.isEditMode) {
        this.taskService.updateTask(formData, this.data.id).subscribe(
          (res) => {
            console.log('Tarefa atualizada com sucesso');
          }
        );
      } else {
        this.taskService.createTask(formData).subscribe(
          (res) => {
            console.log('Tarefa criada com sucesso');
          }
        );
      }
      completed = true;
      return this.dialogRef.close({completed});
    }
    console.log('Erro no formulário');
  }

  closeModal() {
    this.dialogRef.close();
  }
}
