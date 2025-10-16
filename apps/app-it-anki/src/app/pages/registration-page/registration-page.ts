import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.less',
})
export class RegistrationPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);

  readonly formRegistration = this.fb.group({
    email: '',
    password: '',
  });

  async onSubmitRegistration() {
    const response = await firstValueFrom(
      this.authService.registerUser(this.formRegistration.getRawValue())
    );
    console.log(response);
  }
}
