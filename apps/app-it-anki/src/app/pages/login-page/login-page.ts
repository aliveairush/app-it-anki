import { Component, inject, signal } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './login-page.html',
  styleUrl: './login-page.less',
})
export class LoginPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);

  readonly formLogin = this.fb.group({
    email: '',
    password: '',
  });

  readonly loginResponse = signal<any>(null);

  async onSubmitLogin() {
    const response = await firstValueFrom(
      this.authService.loginUser(this.formLogin.getRawValue())
    );
    console.log(response);
    this.loginResponse.set(response);
  }
}
