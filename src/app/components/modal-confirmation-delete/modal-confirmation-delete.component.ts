import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-modal-confirmation-delete',
  templateUrl: './modal-confirmation-delete.component.html',
  styleUrls: ['./modal-confirmation-delete.component.scss']
})
export class ModalConfirmationDeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<ModalConfirmationDeleteComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  confirmAction() {
    let completed = false;
    this.taskService.deleteTask(this.data).subscribe(
      (res) => {
        console.log('Tarefa atualizada com sucesso');
        completed = true
      }
    );
    return this.dialogRef.close({completed});
  }

  closeModal() {
    this.dialogRef.close();
  }
}
