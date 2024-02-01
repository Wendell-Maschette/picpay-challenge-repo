import { AuthService } from '../login/services/auth/auth.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
