import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NgOptimizedImage,
    RouterLink
  ],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage: string | null = null;

  onSubmit(): void {
    if (this.form.valid) {
      const rawForm = this.form.getRawValue();
      this.authService.login(rawForm.email, rawForm.password).subscribe({
        next: () => {
          this.router.navigateByUrl('/form');
        },
        error: (err) => {
          this.handleError(err);
        }
      });
    } else {
      this.errorMessage = 'E-mail ou senha inválidos';
    }
  }

  private handleError(error: any) {
    switch (error.code) {
      case 'auth/invalid-email':
        this.errorMessage = 'O e-mail fornecido é inválido.';
        break;
      case 'auth/user-disabled':
        this.errorMessage = 'O usuário com este e-mail foi desativado.';
        break;
      case 'auth/user-not-found':
        this.errorMessage = 'Não há usuário correspondente a este identificador.';
        break;
      case 'auth/wrong-password':
        this.errorMessage = 'A senha é inválida.';
        break;
      default:
        this.errorMessage = 'Erro desconhecido: ' + error.message;
    }
  }
}
