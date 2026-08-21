import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html'
})
export class AdminLayoutComponent {
  authService = inject(AuthService);

  isSidebarCollapsed = signal(false);
  isSeatMenuOpen = signal(true);

  toggleSidebar() {
    this.isSidebarCollapsed.update(v => !v);
  }

  toggleSeatMenu() {
    this.isSeatMenuOpen.update(v => !v);
  }

  logout() {
    this.authService.logout();
  }
}
