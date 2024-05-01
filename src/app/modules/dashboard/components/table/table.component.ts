import { Component, Input, inject, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/modules/dashboard/models/task.interface';
import { ModalConfirmationDeleteComponent } from '../modal-confirmation-delete/modal-confirmation-delete.component';
import { ModalInsertTaskComponent } from '../modal-insert-task/modal-insert-task.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource!: MatTableDataSource<Task>;
  @Input() displayedColumns: string[] = [
    'name',
    'title',
    'value',
    'date',
    'isPayed',
    'actions',
    'actions-mobile',
  ];

  columnHeaders: { [key: string]: string } = {
    name: 'Nome',
    title: 'Título',
    value: 'Valor',
    date: 'Data',
    isPayed: 'Pago',
    actions: 'Ações',
    'actions-mobile': 'Ações',
  };
  dialog = inject(MatDialog);
  

  defaultColumValidator(columnParam: string): boolean {
    if (
      columnParam !== 'actions' &&
      columnParam !== 'actions-mobile' &&
      columnParam !== 'date' &&
      columnParam !== 'value' &&
      columnParam !== 'isPayed'
    ) {
      return true;
    }
    return false
  }

  editTask(itemToEdit: Task) {
    const dialogRef = this.dialog.open(ModalInsertTaskComponent, {
      disableClose: true,
      width: '400px',
      data: itemToEdit,
    });

    dialogRef.afterClosed().subscribe((result) => {
      result ? window.location.reload() : '';
    });
  }

  confirmationDelete(taskId: number) {
    const dialogRef = this.dialog.open(ModalConfirmationDeleteComponent, {
      disableClose: true,
      width: '400px',
      data: taskId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      result ? window.location.reload() : '';
    });
  }
}
