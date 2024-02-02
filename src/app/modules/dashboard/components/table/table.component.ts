import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/modules/dashboard/models/task.interface';

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

  editItem(index: number) {
    // Lógica para editar item
  }

  deleteItem(index: number) {
    // Lógica para excluir item
  }
}
