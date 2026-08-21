import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  username = '';
  password = '';
  isSubmitting = signal(false);
  errorMessage = signal('');

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage.set('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const success = this.authService.login(this.username);
    if (success) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
      this.router.navigateByUrl(returnUrl);
    } else {
      this.isSubmitting.set(false);
      this.errorMessage.set('เกิดข้อผิดพลาดในการสร้าง JWT Token');
    }
  }
}
