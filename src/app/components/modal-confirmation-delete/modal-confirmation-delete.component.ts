import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageCode, SnackbarService } from 'src/app/services/snackbar.service';
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
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  confirmAction() {
    this.taskService.deleteTask(this.data).subscribe({
      next: (res) => {
        console.log('Tarefa atualizada com sucesso');
        this.snackbarService.showSnackbar(MessageCode.TaskDeleteSuccess, 'success');
        this.dialogRef.close({ completed: true });
      },
      error: (err: any) => {
        this.snackbarService.showSnackbar(MessageCode.TaskDeleteError, 'error');
        this.dialogRef.close({ completed: false });
      }
    });
  }


  closeModal() {
    this.dialogRef.close();
  }
}
