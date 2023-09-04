import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum MessageCode {
  Success = 'Operação realizada com sucesso!',
  Error = 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
  LoginError = 'Email ou senha incorretos.',
  RegisterAccountError = "A conta informada já existe!",
  RegisterAccountSuccess = "Conta criada com sucesso!",
  TaskUpdateSuccess = "Tarefa atualizada com successo!",
  TaskUpdateError = "Ocorreu um erro ao atualizar tarefa.",
  TaskCreateSuccess = "Tarefa criada com successo!",
  TaskCreateError = "Ocorreu um erro ao criar tarefa.",
  TaskDeleteError = "Ocorreu um erro ao deletar tarefa.",
  TaskDeleteSuccess = "Tarefa deletada com successo!"
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackbar(message: string, messageType: 'error' | 'success') {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      panelClass: messageType === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }
}